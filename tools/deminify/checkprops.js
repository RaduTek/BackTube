// Checks a map's "props" for problems before building.
//
//   node checkprops.js <name>
//
// Reports property renames whose target name already occurs in the bundle (collisions),
// two minified names mapped to the same target (duplicates), and sources that never occur.

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const name = process.argv[2];
const ASSETS = path.resolve(__dirname, '../../static/site_assets/2012');
const file = fs.readdirSync(path.join(ASSETS, 'js_raw')).find((f) => f.replace(/-vfl[\w-]+\.js$/, '') === name);
const map = JSON.parse(fs.readFileSync(path.join(__dirname, 'maps', name + '.json'), 'utf8'));
const ast = parser.parse(fs.readFileSync(path.join(ASSETS, 'js_unminified', file), 'utf8'), { sourceType: 'script' });

const existing = new Set();
traverse(ast, {
    MemberExpression(p) {
        if (!p.node.computed) existing.add(p.node.property.name);
        else if (p.node.property.type === 'StringLiteral') existing.add(p.node.property.value);
    },
    'ObjectProperty|ObjectMethod'(p) {
        const k = p.node.key;
        if (!p.node.computed) existing.add(k.type === 'Identifier' ? k.name : k.value);
    }
});

let problems = 0;
const targets = {};
for (const [from, to] of Object.entries(map.props || {})) {
    if (!existing.has(from)) {
        console.log(`unused: .${from} never occurs`);
        problems++;
    }
    if (existing.has(to)) {
        console.log(`collision: .${from} -> .${to} (".${to}" already exists)`);
        problems++;
    }
    if (targets[to]) {
        console.log(`duplicate: .${targets[to]} and .${from} both -> .${to}`);
        problems++;
    }
    targets[to] = from;
}
console.log(problems ? `${problems} problem(s)` : `OK (${Object.keys(map.props || {}).length} props)`);
process.exit(problems ? 1 : 0);
