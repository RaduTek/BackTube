// Reports where short (likely compiler-renamed) property names are defined and used.
//
//   node props.js <file.js> [--min-len 1] [--max-len 2] [--only a,b,c] [--skip-mapped <map.json>]
//
// For each property name: how often it is used, and its definitions:
//   proto  Class.prototype.p = ...        (method or default value)
//   this   this.p = ... inside Class's constructor / methods
//   obj    { p: ... } object literal keys, with the function they appear in
//   other  x.p = ... on other objects
// Class names come from the (already renamed) top-level bindings, so the report reads well
// once vars are named.

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const args = process.argv.slice(2);
const opt = (n, d) => {
    const i = args.indexOf(n);
    return i >= 0 ? args[i + 1] : d;
};
const file = args[0];
const minLen = Number(opt('--min-len', 1));
const maxLen = Number(opt('--max-len', 2));
const only = opt('--only', null) && new Set(opt('--only').split(','));
const skip = opt('--skip-mapped', null) ? JSON.parse(fs.readFileSync(opt('--skip-mapped'), 'utf8')).props || {} : {};

const ast = parser.parse(fs.readFileSync(file, 'utf8'), { sourceType: 'script' });
const info = new Map();
const get = (n) => info.get(n) || info.set(n, { uses: 0, defs: [] }).get(n);
const wanted = (n) => n.length >= minLen && n.length <= maxLen && !(n in skip) && (!only || only.has(n));

// Name of the top-level function a path is inside: "Class.prototype.method" or "fnName".
function owner(p) {
    let fn = p.getFunctionParent();
    let last = null;
    while (fn) {
        last = fn;
        const up = fn.parentPath.getFunctionParent();
        if (!up || !up.parentPath || up.parentPath.isProgram() || isIife(up)) break;
        fn = up;
    }
    if (!last) return '<top>';
    const parent = last.parentPath;
    if (parent.isVariableDeclarator()) return parent.node.id.name;
    if (last.isFunctionDeclaration()) return last.node.id.name;
    if (parent.isAssignmentExpression()) return generate(parent.node.left).code;
    return '<anon>';
}
const isIife = (fn) => fn.parentPath.isCallExpression() && fn.parentPath.parentPath.isExpressionStatement() && fn.parentPath.parentPath.parentPath.isProgram();

traverse(ast, {
    MemberExpression(p) {
        const n = p.node;
        if (n.computed || !t.isIdentifier(n.property) || !wanted(n.property.name)) return;
        const name = n.property.name;
        get(name).uses++;
        if (!(p.parentPath.isAssignmentExpression() && p.key === 'left')) return;
        const rhs = p.parentPath.node.right;
        const kind = t.isFunction(rhs) ? 'fn' : rhs.type.replace(/Literal|Expression/, '').toLowerCase();
        if (t.isMemberExpression(n.object) && !n.object.computed && n.object.property.name === 'prototype')
            get(name).defs.push(`proto ${generate(n.object.object).code} = ${kind}`);
        else if (t.isThisExpression(n.object)) get(name).defs.push(`this in ${owner(p)} = ${kind}`);
        else get(name).defs.push(`other ${generate(n.object).code.slice(0, 30)} in ${owner(p)} = ${kind}`);
    },
    ObjectProperty(p) {
        const k = p.node.key;
        if (p.node.computed || !t.isIdentifier(k) || !wanted(k.name)) return;
        get(k.name).uses++;
        get(k.name).defs.push(`obj in ${owner(p)}`);
    }
});

const rows = [...info].sort((a, b) => b[1].uses - a[1].uses);
for (const [name, v] of rows) {
    const defs = [...new Set(v.defs)];
    console.log(`.${name}  uses=${v.uses}`);
    for (const d of defs.slice(0, 8)) console.log('    ' + d);
    if (defs.length > 8) console.log(`    ... ${defs.length - 8} more`);
}
console.error(`${rows.length} properties`);
