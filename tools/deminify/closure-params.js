// Fills a map's "locals" with parameter names taken from the Closure Library source.
//
//   node closure-params.js <unminified.js> <map.json> [--closure <dir>] [--write]
//
// For every compiled function whose (renamed) name is a goog.* function or goog.* prototype
// method, the source's parameter names are applied by position, but only when it is safe:
//   - same number of parameters as the source, or
//   - one extra leading parameter on a devirtualized method (Class$method(self, ...)),
//     which then becomes `self`.
// Closure Compiler may drop or inline parameters; when the counts differ the function is
// skipped rather than guessed. Existing "locals" entries are kept.

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const args = process.argv.slice(2);
const write = args.includes('--write');
const ci = args.indexOf('--closure');
const closureDir = ci >= 0 ? args[ci + 1] : path.join(__dirname, '.cache/closure-library/closure/goog');
const [bundleFile, mapFile] = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--closure');

const dotted = (node) => {
    const parts = [];
    while (t.isMemberExpression(node) && !node.computed) {
        parts.unshift(node.property.name);
        node = node.object;
    }
    if (!t.isIdentifier(node)) return null;
    parts.unshift(node.name);
    return parts.join('.');
};

// 1. Source signatures: "goog.a.b" / "goog.A.prototype.m" -> [param names]
function readClosure(dir) {
    const sigs = new Map();
    const walk = (d) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.js') && !e.name.endsWith('_test.js')) {
                let ast;
                try {
                    ast = parser.parse(fs.readFileSync(p, 'utf8'), { sourceType: 'script', errorRecovery: true });
                } catch (err) {
                    continue;
                }
                for (const stmt of ast.program.body) {
                    const e2 = t.isExpressionStatement(stmt) && stmt.expression;
                    if (!t.isAssignmentExpression(e2) || !t.isFunctionExpression(e2.right)) continue;
                    const name = dotted(e2.left);
                    if (name && name.startsWith('goog.') && e2.right.params.every((x) => t.isIdentifier(x)))
                        sigs.set(name, e2.right.params.map((x) => x.name));
                }
            }
        }
    };
    walk(dir);
    return sigs;
}

function main() {
    const sigs = readClosure(closureDir);
    const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    const vars = map.vars || {};
    const props = map.props || {};
    map.locals = map.locals || {};
    // Unminified code, simplified the same way rename.js does before applying locals.
    const { rename } = require('./rename');
    return rename(fs.readFileSync(bundleFile, 'utf8'), { simplify: map.simplify || {} }).then((code) => {
        const ast = parser.parse(code, { sourceType: 'script' });
        let iife;
        traverse(ast, {
            Program(p) {
                iife = p.get('body.0.expression.callee');
                p.stop();
            }
        });
        const candidates = []; // [localsKey, renamedDottedName, fnNode]
        for (const [name, b] of Object.entries(iife.scope.bindings)) {
            let fn = null;
            if (b.path.isFunctionDeclaration()) fn = b.path.node;
            else if (b.path.isVariableDeclarator() && t.isFunctionExpression(b.path.node.init)) fn = b.path.node.init;
            if (fn && vars[name]) candidates.push([name, vars[name].replace(/\$/g, '.'), fn]);
        }
        for (const stmt of iife.node.body.body) {
            const e = t.isExpressionStatement(stmt) && stmt.expression;
            if (!t.isAssignmentExpression(e) || !t.isFunctionExpression(e.right)) continue;
            const key = dotted(e.left);
            if (!key) continue;
            const parts = key.split('.');
            if (parts.length !== 3 || parts[1] !== 'prototype' || !vars[parts[0]]) continue;
            const cls = vars[parts[0]].replace(/\$/g, '.');
            candidates.push([key, `${cls}.prototype.${props[parts[2]] || parts[2]}`, e.right]);
        }
        let applied = 0;
        let skipped = 0;
        for (const [key, name, fn] of candidates) {
            if (map.locals[key]) continue;
            const compiled = fn.params.map((p) => p.name);
            if (!compiled.length) continue;
            let source = sigs.get(name);
            if (!source) {
                // Devirtualized method: goog.a.B$method(self, ...) <- goog.a.B.prototype.method
                const m = name.match(/^(.*)\.([^.]+)$/);
                const proto = m && sigs.get(`${m[1]}.prototype.${m[2]}`);
                if (proto && proto.length + 1 === compiled.length) source = ['self', ...proto];
            }
            if (!source) continue;
            if (source.length !== compiled.length) {
                skipped++;
                continue;
            }
            const entry = {};
            compiled.forEach((c, i) => {
                if (c !== source[i]) entry[c] = source[i];
            });
            if (Object.keys(entry).length) {
                map.locals[key] = entry;
                applied++;
            }
        }
        console.log(`closure signatures: ${sigs.size}; functions named: ${applied}; skipped (param count differs): ${skipped}`);
        if (write) fs.writeFileSync(mapFile, JSON.stringify(map, null, 4) + '\n');
    });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
