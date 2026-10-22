// Reverses minifier tricks in the raw jsbin bundles without changing behaviour.
//
//   node unminify.js <raw.js> <out.js>
//
// Uses webcrack's unminify transforms, minus the two steps that are unsafe or
// non-ES5 for this code:
//   - var-functions: turns `var d = function(){}` into a block-level function
//     declaration, which changes hoisting (breaks www-core's X.prototype.oc).
//   - transpile: emits ES2021 syntax such as `a ||= b`.
// The output is formatted with Prettier and must stay ES5 (no trailing commas,
// which IE8 counts as extra array elements).

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const PRETTIER_OPTS = { parser: 'babel', tabWidth: 4, printWidth: 120, trailingComma: 'none' };

async function loadSafeWebcrack() {
    const dist = path.join(__dirname, 'node_modules', 'webcrack', 'dist');
    const patched = path.join(dist, 'index.es5safe.js');
    let src = fs.readFileSync(path.join(dist, 'index.js'), 'utf8');
    const patches = [
        [
            '[block_statements_default, sequence_default, split_variable_declarations_default, var_functions_default]',
            '[block_statements_default, sequence_default, split_variable_declarations_default]'
        ],
        ['applyTransforms(ast, [transpile_default, unminify_default]);', 'applyTransforms(ast, [unminify_default]);']
    ];
    for (const [from, to] of patches) {
        if (!src.includes(from)) throw new Error('webcrack patch no longer applies, check its pipeline: ' + from);
        src = src.replace(from, to);
    }
    fs.writeFileSync(patched, src);
    return (await import(patched)).webcrack;
}

async function unminify(code) {
    const webcrack = await loadSafeWebcrack();
    const result = await webcrack(code, { unpack: false, deobfuscate: false, unminify: true, jsx: false, mangle: false });
    return prettier.format(result.code, PRETTIER_OPTS);
}

module.exports = { unminify, PRETTIER_OPTS };

if (require.main === module) {
    const [inFile, outFile] = process.argv.slice(2);
    if (!inFile || !outFile) {
        console.error('usage: node unminify.js <raw.js> <out.js>');
        process.exit(2);
    }
    unminify(fs.readFileSync(inFile, 'utf8'))
        .then((out) => fs.writeFileSync(outFile, out))
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
}
