// Lists the top-level bindings of a bundle, to help match them to Closure / YouTube source.
//
//   node inspect.js <file.js> [--unnamed] [--from <line>] [--to <line>]
//
// One line per binding: line, name, kind/arity, reference count, string literals
// and member names used inside it. --unnamed hides bindings whose name is longer
// than 3 characters (i.e. already renamed).

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const args = process.argv.slice(2);
const opt = (n) => {
    const i = args.indexOf(n);
    return i >= 0 ? args[i + 1] : null;
};
const file = args[0];
const unnamedOnly = args.includes('--unnamed');
const from = Number(opt('--from') || 0);
const to = Number(opt('--to') || Infinity);

const ast = parser.parse(fs.readFileSync(file, 'utf8'), { sourceType: 'script' });
let iife;
traverse(ast, {
    Program(p) {
        iife = p.get('body.0.expression.callee');
        p.stop();
    }
});

const rows = [];
for (const [name, b] of Object.entries(iife.scope.bindings)) {
    const line = b.identifier.loc.start.line;
    if (line < from || line > to) continue;
    if (unnamedOnly && name.length > 3) continue;
    let fn = null;
    let kind = b.kind;
    if (b.path.isFunctionDeclaration()) fn = b.path;
    else if (b.path.isVariableDeclarator() && b.path.get('init').isFunction()) fn = b.path.get('init');
    else if (b.path.isVariableDeclarator() && b.path.node.init) kind = 'var=' + b.path.node.init.type.replace('Expression', '');
    const strings = new Set();
    const members = new Set();
    const body = fn || (b.path.isVariableDeclarator() ? b.path.get('init') : null);
    if (body && body.node) {
        body.traverse({
            StringLiteral(p) {
                strings.add(JSON.stringify(p.node.value.slice(0, 40)));
            },
            MemberExpression(p) {
                if (!p.node.computed && p.node.property.name.length > 2) members.add(p.node.property.name);
            }
        });
        if (body.isStringLiteral()) strings.add(JSON.stringify(body.node.value.slice(0, 40)));
    }
    const sig = fn ? `fn(${fn.node.params.map((p) => p.name).join(',')})` : kind;
    const extra = [...strings].slice(0, 6).join(' ') + (members.size ? ' .' + [...members].slice(0, 8).join(' .') : '');
    rows.push([line, `${String(line).padStart(6)}  ${name.padEnd(28)} ${sig.padEnd(16)} refs=${String(b.references).padEnd(4)} ${extra}`]);
}
rows.sort((a, b) => a[0] - b[0]);
console.log(rows.map((r) => r[1]).join('\n'));
console.error(`${rows.length} bindings`);
