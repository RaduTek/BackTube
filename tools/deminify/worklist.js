// Prints functions whose parameters / locals still have minified names, for naming by hand.
//
//   node worklist.js <name> [--prefix yt$www$lists] [--max-body 500] [--all] [--nested]
//
// <name> is the bundle name (maps/<name>.json, js_unminified/ and js_src/ files are found from it).
// For each top-level function and prototype method:
//   <locals key>  <readable name>(params)  own vars: ...
//       <compact body from js_src>
// The locals key uses original minified names, as rename.js expects. Functions that already
// have a "locals" entry are skipped unless --all is given. With --nested, functions nested inside
// them are listed instead, keyed "<key>/<n>" (n-th nested function in source order).

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const { rename, nestedFunctions, exportedFunction, moduleFactory, topLevelIife } = require('./rename');

const args = process.argv.slice(2);
const opt = (n, d) => {
    const i = args.indexOf(n);
    return i >= 0 ? args[i + 1] : d;
};
const name = args[0];
const prefix = opt('--prefix', '');
const maxBody = Number(opt('--max-body', 500));
const all = args.includes('--all');
const nested = args.includes('--nested');

const ASSETS = path.resolve(__dirname, '../../static/site_assets/2012');
const file = fs.readdirSync(path.join(ASSETS, 'js_raw')).find((f) => f.replace(/-vfl[\w-]+\.js$/, '') === name);
const map = JSON.parse(fs.readFileSync(path.join(__dirname, 'maps', name + '.json'), 'utf8'));

const iifeOf = (ast) => {
    let iife;
    traverse(ast, {
        Program(p) {
            iife = p.get('body.0.expression.callee');
            p.stop();
        }
    });
    return iife;
};
let iifeCount = 0;
const keyOf = (stmt) => {
    // returns [key, fnPath] for function-valued top-level statements
    if (stmt.isFunctionDeclaration()) return [stmt.node.id.name, stmt];
    if (stmt.isVariableDeclaration() && stmt.node.declarations.length === 1) {
        const d = stmt.get('declarations.0');
        if (d.get('init').isFunctionExpression()) return [d.node.id.name, d.get('init')];
    }
    if (topLevelIife(stmt)) return ['iife:' + iifeCount++, topLevelIife(stmt)];
    const factory = moduleFactory(stmt);
    if (factory) return factory;
    const exported = exportedFunction(stmt);
    if (exported) return ['export:' + exported[0], exported[1]];
    if (stmt.isExpressionStatement()) {
        const e = stmt.get('expression');
        if (e.isAssignmentExpression() && e.get('right').isFunctionExpression()) {
            const code = generate(e.node.left).code;
            if (/^[\w$]+(\.[\w$]+)*$/.test(code)) return [code, e.get('right')];
        }
    }
    return null;
};

(async () => {
    const simplified = await rename(fs.readFileSync(path.join(ASSETS, 'js_unminified', file), 'utf8'), {
        simplify: map.simplify || {}
    });
    const A = iifeOf(parser.parse(simplified, { sourceType: 'script' })).get('body.body');
    const B = iifeOf(parser.parse(fs.readFileSync(path.join(ASSETS, 'js_src', file), 'utf8'), { sourceType: 'script' })).get('body.body');
    if (A.length !== B.length) throw new Error(`statement counts differ (${A.length} vs ${B.length})`);
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        const before = iifeCount;
        const a = keyOf(A[i]);
        iifeCount = before;
        const b = keyOf(B[i]);
        if (!a || !b) continue;
        const [key] = a;
        const [readable, fn] = b;
        if (prefix && !readable.startsWith(prefix)) continue;
        if (nested) {
            const inner = nestedFunctions(fn);
            if (inner.length !== nestedFunctions(a[1]).length) throw new Error(`nested count differs in ${key}`);
            inner.forEach((nf, n) => {
                const nkey = `${key}/${n}`;
                if (!all && map.locals && map.locals[nkey]) return;
                const own = Object.keys(nf.scope.bindings).filter((x) => x !== 'arguments');
                if (!own.some((x) => x.length <= 2 && !(nf.parentPath.scope.hasBinding(x) && nf.parentPath.scope.getBinding(x) === nf.scope.getBinding(x)))) return;
                const params = nf.node.params.map((p) => p.name);
                const vars = own.filter((x) => !params.includes(x));
                let body = generate(nf.node.body, { compact: true }).code;
                if (body.length > maxBody) body = body.slice(0, maxBody) + '…';
                console.log(`${nkey}  in ${readable}: function(${params.join(', ')})${vars.length ? '  vars: ' + vars.join(',') : ''}\n    ${body}`);
                count++;
            });
            continue;
        }
        if (!all && map.locals && map.locals[key]) continue;
        const own = Object.keys(fn.scope.bindings);
        if (!own.some((n) => n.length <= 2)) continue;
        const params = fn.node.params.map((p) => p.name);
        const vars = own.filter((n) => !params.includes(n) && n !== 'arguments');
        let body = generate(fn.node.body, { compact: true }).code;
        if (body.length > maxBody) body = body.slice(0, maxBody) + '…';
        console.log(`${key}  ${readable}(${params.join(', ')})${vars.length ? '  vars: ' + vars.join(',') : ''}\n    ${body}`);
        count++;
    }
    console.error(`${count} functions`);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
