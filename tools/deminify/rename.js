// Applies a rename map to an unminified bundle using scope-aware AST renaming.
//
//   node rename.js <unminified.js> <map.json> <out.js>
//
// Map format (keys are always the ORIGINAL minified names, so the map stays
// valid no matter what order entries are added in):
//
// {
//   "simplify": {                                 // undo Closure Compiler aliasing (runs first)
//     "constants":  ["i", "k", "l", "m"],         // `var k = true;` etc. inlined back into every use
//     "throwAlias": "h",                          // `h(x);` statements become `throw x;`
//     "protoAlias": "n"                           // `n = X.prototype; n.foo = ...` -> `X.prototype.foo = ...`
//   },
//   "vars":   { "ea": "goog$typeOf" },            // bindings in the bundle's top-level IIFE scope
//   "locals": { "ea": { "a": "value" },           // params/vars of a top-level function...
//               "X.prototype.oc": { "a": "el" },  // ...or of a function assigned to a member chain,
//               "export:yt.foo": { "a": "el" },   // ...or passed to exportSymbol("yt.foo", function...),
//               "module:152:33": { "a": "el" },   // ...or a factory in registry.M(152, 33, function...),
//               "iife:2": { "a": "el" },          // ...or the 3rd top-level (function () {...})() statement,
//               "ea/2": { "a": "item" } },        // ...or the 3rd function nested (any depth) inside one
//   "props":  { "Eb": "instance_" }               // property names, renamed file-wide
// }
//
// Flattened Closure namespaces use `$` as the separator (goog.array.forEach ->
// goog$array$forEach), the same convention Closure Compiler uses internally, so
// they can be mechanically turned back into dotted names later.
//
// Property renames are file-wide. Closure's ADVANCED mode may give unrelated
// properties the same short name, so only add a prop once every use of that
// short name has been checked to mean the same thing.

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const prettier = require('prettier');
const { PRETTIER_OPTS } = require('./unminify');

const RESERVED = new Set(
    (
        'break case catch class const continue debugger default delete do else enum export extends false finally for ' +
        'function if implements import in instanceof interface let new null package private protected public return ' +
        'static super switch this throw true try typeof var void while with yield arguments eval undefined NaN Infinity'
    ).split(' ')
);
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function fail(msg) {
    throw new Error(msg);
}

function checkIdent(name, what) {
    if (!IDENT.test(name) || RESERVED.has(name)) fail(`${what}: "${name}" is not a usable identifier`);
}

function findIife(ast) {
    let iife = null;
    traverse(ast, {
        Program(p) {
            const stmt = p.get('body.0');
            const call = stmt && stmt.isExpressionStatement() && stmt.get('expression');
            if (call && call.isCallExpression() && call.get('callee').isFunctionExpression()) iife = call.get('callee');
            p.stop();
        }
    });
    return iife || fail('bundle does not start with an IIFE');
}

// Names bound in `scope` or any scope nested inside it, plus free (global) references.
function namesInside(scopePath) {
    const names = new Set();
    scopePath.traverse({
        Scopable(p) {
            for (const n of Object.keys(p.scope.bindings)) names.add(n);
        }
    });
    for (const n of Object.keys(scopePath.scope.bindings)) names.add(n);
    for (const n of Object.keys(scopePath.scope.getProgramParent().globals)) names.add(n);
    return names;
}

function memberChain(node) {
    const parts = [];
    while (node && node.type === 'MemberExpression' && !node.computed) {
        parts.unshift(node.property.name);
        node = node.object;
    }
    if (!node || node.type !== 'Identifier') return null;
    parts.unshift(node.name);
    return parts.join('.');
}

// [publicName, fnPath] for a top-level `exportSymbol("a.b", function () {...})` statement.
function exportedFunction(stmt) {
    if (!stmt.isExpressionStatement()) return null;
    const call = stmt.get('expression');
    if (!call.isCallExpression() || call.node.arguments.length !== 2) return null;
    const [name, fn] = call.get('arguments');
    if (!name.isStringLiteral() || !fn.isFunctionExpression()) return null;
    return [name.node.value, fn];
}

// The function of a top-level `(function () {...})();` statement, or null.
function topLevelIife(stmt) {
    if (!stmt.isExpressionStatement()) return null;
    const call = stmt.get('expression');
    if (!call.isCallExpression() || call.node.arguments.length) return null;
    const fn = call.get('callee');
    return fn.isFunctionExpression() ? fn : null;
}

// ["module:<a>:<b>", fnPath] for a top-level `x.y(<number a>, <number b>, function () {...})` statement.
function moduleFactory(stmt) {
    if (!stmt.isExpressionStatement()) return null;
    const call = stmt.get('expression');
    if (!call.isCallExpression() || call.node.arguments.length !== 3) return null;
    const [a, b, fn] = call.get('arguments');
    if (!a.isNumericLiteral() || !b.isNumericLiteral() || !fn.isFunctionExpression()) return null;
    return [`module:${a.node.value}:${b.node.value}`, fn];
}

// Nested functions are addressed as "<key>/<n>": the n-th function (0-based, source order,
// any depth) inside the function that <key> names.
function nestedFunctions(fn) {
    const list = [];
    fn.traverse({
        Function(p) {
            list.push(p);
        }
    });
    return list;
}

// Finds the function path for a "locals" key in the top-level IIFE scope.
function findFunction(iife, key) {
    const slash = key.indexOf('/');
    if (slash >= 0) {
        const parent = findFunction(iife, key.slice(0, slash));
        const n = Number(key.slice(slash + 1));
        return nestedFunctions(parent)[n] || fail(`locals: "${key}" has no nested function #${n}`);
    }
    // "export:a.b.c" is the anonymous function in a top-level exportSymbol("a.b.c", function () {...}).
    // "module:152:33" is the factory in a top-level `registry.M(152, 33, function () {...})` call
    // (the searchbox library's component registrations; `uf` registrations match too).
    // "iife:2" is the 3rd top-level `(function () {...})();` statement (module-pattern bundles).
    if (key.startsWith('iife:')) {
        const n = Number(key.slice(5));
        const found = iife.get('body.body').filter((stmt) => topLevelIife(stmt));
        return (found[n] && topLevelIife(found[n])) || fail(`locals: "${key}" has no top-level IIFE #${n}`);
    }
    if (key.startsWith('module:')) {
        const found = iife.get('body.body').filter((stmt) => moduleFactory(stmt) && moduleFactory(stmt)[0] === key);
        if (found.length !== 1) fail(`locals: "${key}" matches ${found.length} module factories, expected 1`);
        return moduleFactory(found[0])[1];
    }
    if (key.startsWith('export:')) {
        const name = key.slice(7);
        const found = iife.get('body.body').filter((stmt) => exportedFunction(stmt) && exportedFunction(stmt)[0] === name);
        if (found.length !== 1) fail(`locals: "${key}" matches ${found.length} exported functions, expected 1`);
        return exportedFunction(found[0])[1];
    }
    if (!key.includes('.')) {
        const b = iife.scope.getOwnBinding(key) || fail(`locals: no top-level binding "${key}"`);
        if (b.path.isFunctionDeclaration()) return b.path;
        if (b.path.isVariableDeclarator() && b.path.get('init').isFunction()) return b.path.get('init');
        // `var x = (function () {...})();` — the IIFE that produces x.
        const init = b.path.isVariableDeclarator() && b.path.get('init');
        if (init && init.isCallExpression() && init.get('callee').isFunctionExpression() && !init.node.arguments.length)
            return init.get('callee');
        // Module pattern: `var x;` at the top, `x = function () {...}` assigned exactly once elsewhere.
        if (b.constantViolations.length === 1 && b.constantViolations[0].isAssignmentExpression()) {
            const rhs = b.constantViolations[0].get('right');
            if (rhs.isFunction()) return rhs;
        }
        fail(`locals: "${key}" is not a function`);
    }
    const found = [];
    iife.traverse({
        AssignmentExpression(p) {
            if (p.get('right').isFunction() && memberChain(p.node.left) === key) found.push(p.get('right'));
        }
    });
    if (found.length !== 1) fail(`locals: "${key}" matches ${found.length} function assignments, expected 1`);
    return found[0];
}

// Local renames that would collide are skipped with a warning rather than failing the build:
// there are thousands of them and one bad name should not block the rest.
const warnings = [];
// Locals keys use original minified names, so functions are located before top-level renames
// and renamed after them (so a local is never blocked by a minified top-level name).
function resolveLocals(iife, locals) {
    return Object.entries(locals || {}).map(([key, renames]) => [key, findFunction(iife, key), renames]);
}

function renameLocals(resolved) {
    for (const [key, fn, renames] of resolved) {
        for (const [from, to] of Object.entries(renames)) {
            checkIdent(to, `locals ${key}.${from}`);
            if (!fn.scope.getOwnBinding(from)) fail(`locals: "${key}" has no own binding "${from}"`);
            if (fn.scope.parent.hasBinding(to) || namesInside(fn).has(to)) {
                warnings.push(`locals: skipped ${key}.${from} -> ${to} (collides with an existing "${to}")`);
                continue;
            }
            fn.scope.rename(from, to);
        }
    }
}

function renameVars(iife, vars) {
    const taken = namesInside(iife);
    for (const [from, to] of Object.entries(vars || {})) {
        checkIdent(to, `vars ${from}`);
        if (!iife.scope.getOwnBinding(from)) fail(`vars: no top-level binding "${from}"`);
        if (taken.has(to)) fail(`vars: renaming ${from} -> ${to} would collide with an existing "${to}"`);
        iife.scope.rename(from, to);
        taken.delete(from);
        taken.add(to);
    }
}

function renameProps(ast, props) {
    const entries = Object.entries(props || {});
    if (!entries.length) return;
    const existing = new Set();
    const keyOf = (p) => {
        const n = p.node;
        if (p.isMemberExpression() && !n.computed) return ['property', n.property];
        if (p.isMemberExpression() && n.computed && n.property.type === 'StringLiteral') return ['property', n.property];
        if ((p.isObjectProperty() || p.isObjectMethod()) && !n.computed) return ['key', n.key];
        return null;
    };
    const nameOf = (node) => (node.type === 'Identifier' ? node.name : node.type === 'StringLiteral' ? node.value : null);
    traverse(ast, {
        'MemberExpression|ObjectProperty|ObjectMethod'(p) {
            const k = keyOf(p);
            if (k) existing.add(nameOf(k[1]));
        }
    });
    const map = new Map();
    for (const [from, to] of entries) {
        checkIdent(to, `props ${from}`);
        if (!existing.has(from)) fail(`props: property "${from}" never occurs`);
        if (existing.has(to)) fail(`props: renaming .${from} -> .${to} would collide with an existing property "${to}"`);
        map.set(from, to);
    }
    traverse(ast, {
        'MemberExpression|ObjectProperty|ObjectMethod'(p) {
            const k = keyOf(p);
            if (!k) return;
            const node = k[1];
            const to = map.get(nameOf(node));
            if (!to) return;
            if (node.type === 'Identifier') node.name = to;
            else node.value = to;
        }
    });
}

function ownBinding(iife, name, what) {
    return iife.scope.getOwnBinding(name) || fail(`${what}: no top-level binding "${name}"`);
}

function removeDeclaration(binding) {
    const decl = binding.path.parentPath;
    if (decl.node.declarations.length === 1) decl.remove();
    else binding.path.remove();
}

// `var k = true;` -> every `k` becomes `true`. Only for never-reassigned literals.
function inlineConstants(iife, names) {
    for (const name of names || []) {
        const b = ownBinding(iife, name, 'constants');
        const init = b.path.isVariableDeclarator() && b.path.node.init;
        const literal = init && (t.isLiteral(init) || t.isIdentifier(init, { name: 'undefined' }));
        if (!literal || !b.constant || init.type === 'RegExpLiteral' || init.type === 'TemplateLiteral')
            fail(`constants: "${name}" is not a never-reassigned literal`);
        for (const ref of b.referencePaths) {
            if (init.type === 'Identifier' && ref.scope.hasBinding('undefined', { noGlobals: true }))
                fail(`constants: "undefined" is shadowed where "${name}" is used`);
            ref.replaceWith(t.cloneNode(init));
        }
        removeDeclaration(b);
    }
}

// `function h(a) { throw a; }`: statement calls `h(x);` become `throw x;`.
// Calls used as expressions keep the helper.
function inlineThrow(iife, name) {
    if (!name) return;
    const b = ownBinding(iife, name, 'throwAlias');
    const body = b.path.isFunctionDeclaration() && b.path.node.body.body;
    const param = body && b.path.node.params.length === 1 && b.path.node.params[0].name;
    if (!param || body.length !== 1 || !t.isThrowStatement(body[0]) || !t.isIdentifier(body[0].argument, { name: param }))
        fail(`throwAlias: "${name}" is not function(a) { throw a; }`);
    if (!b.constant) fail(`throwAlias: "${name}" is reassigned`);
    let remaining = 0;
    for (const ref of b.referencePaths) {
        const call = ref.parentPath;
        if (call.isCallExpression() && ref.key === 'callee' && call.node.arguments.length === 1 && call.parentPath.isExpressionStatement()) {
            call.parentPath.replaceWith(t.throwStatement(call.node.arguments[0]));
        } else remaining++;
    }
    if (!remaining) b.path.remove();
}

// Closure reuses one variable for prototype assignments:
//   n = X.prototype; n.foo = function() {...}; n.bar = ...;
// Every use must be in a top-level statement of the IIFE (never inside a nested
// function, which would see whatever was assigned last at call time).
function expandProtoAlias(iife, name) {
    if (!name) return;
    const b = ownBinding(iife, name, 'protoAlias');
    if (b.path.node.init) fail(`protoAlias: "${name}" has an initializer`);
    for (const p of [...b.referencePaths, ...b.constantViolations]) {
        if (p.getFunctionParent() !== iife) fail(`protoAlias: "${name}" is used inside a nested function (line ${p.node.loc?.start.line})`);
    }
    const refs = new Set(b.referencePaths.map((p) => p.node));
    let current = null;
    for (const stmt of iife.get('body.body')) {
        const e = stmt.isExpressionStatement() && stmt.node.expression;
        if (e && t.isAssignmentExpression(e, { operator: '=' }) && t.isIdentifier(e.left, { name })) {
            if (!t.isMemberExpression(e.right) || memberChain(e.right) === null || !memberChain(e.right).endsWith('.prototype'))
                fail(`protoAlias: "${name}" is assigned something other than X.prototype (line ${e.loc?.start.line})`);
            current = e.right;
            stmt.remove();
            continue;
        }
        stmt.traverse({
            Identifier(p) {
                if (!refs.has(p.node)) return;
                if (!current) fail(`protoAlias: "${name}" used before any assignment (line ${p.node.loc?.start.line})`);
                p.replaceWith(t.cloneNode(current));
                p.skip();
            }
        });
    }
    removeDeclaration(b);
}

async function rename(code, map) {
    let ast = parser.parse(code, { sourceType: 'script' });
    let iife = findIife(ast);
    const simplify = map.simplify || {};
    inlineConstants(iife, simplify.constants);
    inlineThrow(iife, simplify.throwAlias);
    expandProtoAlias(iife, simplify.protoAlias);
    // Re-parse so scope information reflects the simplified tree.
    ast = parser.parse(generate(ast).code, { sourceType: 'script' });
    iife = findIife(ast);
    const locals = resolveLocals(iife, map.locals);
    renameProps(ast, map.props);
    renameVars(iife, map.vars);
    renameLocals(locals);
    if (warnings.length) console.warn(warnings.splice(0).join('\n'));
    return prettier.format(generate(ast, { retainLines: false, comments: true }).code, PRETTIER_OPTS);
}

module.exports = { rename, nestedFunctions, exportedFunction, moduleFactory, topLevelIife };

if (require.main === module) {
    const [inFile, mapFile, outFile] = process.argv.slice(2);
    if (!inFile || !mapFile || !outFile) {
        console.error('usage: node rename.js <unminified.js> <map.json> <out.js>');
        process.exit(2);
    }
    rename(fs.readFileSync(inFile, 'utf8'), JSON.parse(fs.readFileSync(mapFile, 'utf8')))
        .then((out) => fs.writeFileSync(outFile, out))
        .catch((e) => {
            console.error(e.message);
            process.exit(1);
        });
}
