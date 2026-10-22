// Carries top-level names from one bundle's map to another bundle by structural matching.
//
//   node carryover.js <src-unminified.js> <src-map.json> <dst-unminified.js> <dst-map.json> [--write]
//
// Both bundles are first simplified with their maps' "simplify" settings, then every top-level
// binding gets a fingerprint: its own code plus every top-level statement attached to it
// (`X.prototype.foo = ...`, `X.bar = ...`, `goog$inherits(X, Y)`), serialized with
//   - local variables replaced by their order of first appearance,
//   - property names of 1-2 characters (compiler-renamed) replaced by `P`,
//   - references to other top-level bindings replaced by their matched name, or `?` if unknown.
// Fingerprints that are unique on both sides are matched; exported names are matched up front.
// When two bindings match, the `?` references inside them line up by position, which matches
// those too. This repeats until nothing new is found.
//
// Without --write the result is only reported. With --write, names for matched bindings are
// added to the destination map's "vars" (existing entries are kept).

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const args = process.argv.slice(2);
const write = args.includes('--write');
const reportAt = args.indexOf('--report');
const report = reportAt >= 0 ? args.splice(reportAt, 2)[1] : null;
const [srcFile, srcMapFile, dstFile, dstMapFile] = args.filter((a) => a !== '--write');

// Applies only the "simplify" passes, so both sides lose their compiler aliases.
async function simplified(file, mapFile) {
    const { rename } = require('./rename');
    const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    return { code: await rename(fs.readFileSync(file, 'utf8'), { simplify: map.simplify || {} }), map };
}

function analyze(code) {
    const ast = parser.parse(code, { sourceType: 'script' });
    let iife;
    traverse(ast, {
        Program(p) {
            iife = p.get('body.0.expression.callee');
            p.stop();
        }
    });
    const scope = iife.scope;
    const bindings = new Map(); // name -> { name, parts: [paths], exports: [] }
    for (const [name, b] of Object.entries(scope.bindings)) {
        let own = null;
        if (b.path.isFunctionDeclaration()) own = b.path;
        else if (b.path.isVariableDeclarator() && b.path.node.init) own = b.path.get('init');
        bindings.set(name, { name, parts: own ? [own] : [], exports: [] });
    }
    const rootName = (node) => {
        while (t.isMemberExpression(node)) node = node.object;
        return t.isIdentifier(node) ? node.name : null;
    };
    for (const stmt of iife.get('body.body')) {
        if (!stmt.isExpressionStatement()) continue;
        const e = stmt.get('expression');
        let owner = null;
        if (e.isAssignmentExpression() && t.isMemberExpression(e.node.left)) owner = rootName(e.node.left);
        else if (e.isCallExpression() && e.node.arguments.length) {
            const callee = e.node.callee;
            const a0 = e.node.arguments[0];
            if (t.isStringLiteral(a0) && e.node.arguments.length === 2 && t.isIdentifier(e.node.arguments[1])) {
                // exportSymbol("a.b.c", x)
                const target = bindings.get(e.node.arguments[1].name);
                if (target && scope.getBinding(e.node.arguments[1].name) === scope.bindings[target.name])
                    target.exports.push(a0.value);
                continue;
            }
            if (t.isIdentifier(callee) && t.isIdentifier(a0)) owner = a0.name; // goog$inherits(X, Y), addSingletonGetter(X)
        }
        const b = owner && bindings.get(owner);
        if (b && scope.getBinding(owner) === scope.bindings[owner]) b.parts.push(stmt);
    }
    return { scope, bindings };
}

// Serializes a binding's parts. `label(name)` gives the current label of a top-level binding.
function fingerprint(info, entry, label, refsOut) {
    const out = [];
    const locals = new Map();
    const scope = info.scope;
    const visit = (node, parentPath) => {
        if (node === null || node === undefined) {
            out.push('_');
            return;
        }
        if (Array.isArray(node)) {
            out.push('[');
            node.forEach((n) => visit(n, parentPath));
            out.push(']');
            return;
        }
        if (typeof node !== 'object' || !node.type) {
            out.push(JSON.stringify(node));
            return;
        }
        switch (node.type) {
            case 'Identifier': {
                const name = node.name;
                const top = scope.bindings[name];
                const binding = parentPath && parentPath.scope.getBinding(name);
                if (top && binding === top) {
                    const l = label(name);
                    if (l === '?') refsOut.push(name);
                    out.push('R:' + l);
                } else if (binding) {
                    if (!locals.has(binding)) locals.set(binding, locals.size);
                    out.push('L' + locals.get(binding));
                } else out.push('G:' + name);
                return;
            }
            case 'StringLiteral':
                out.push('S' + JSON.stringify(node.value));
                return;
            case 'NumericLiteral':
                out.push('N' + node.value);
                return;
        }
        // `function x() {}` and `var x = function () {}` compile from the same source.
        const isFn = node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression';
        out.push('(' + (isFn ? 'Function' : node.type));
        for (const key of t.VISITOR_KEYS[node.type] || []) {
            const child = node[key];
            if (isFn && key === 'id') continue;
            const isPropName =
                (key === 'property' && (node.type === 'MemberExpression') && !node.computed) ||
                (key === 'key' && (node.type === 'ObjectProperty' || node.type === 'ObjectMethod') && !node.computed);
            if (isPropName && t.isIdentifier(child)) {
                out.push(child.name.length <= 2 ? 'P' : '.' + child.name);
                continue;
            }
            if (isPropName && t.isStringLiteral(child)) {
                out.push(child.value.length <= 2 ? 'P' : '.' + child.value);
                continue;
            }
            for (const k of ['operator', 'prefix', 'computed', 'kind']) if (k in node && key === (t.VISITOR_KEYS[node.type] || [])[0]) out.push(k + '=' + node[k]);
            visit(child, node.__path || parentPath);
        }
        out.push(')');
    };
    // Attach paths so nested identifiers resolve in the right scope.
    for (const part of entry.parts) {
        part.traverse({
            enter(p) {
                p.node.__path = p;
            }
        });
        part.node.__path = part;
        out.push('|');
        visit(part.node, part);
    }
    return out.join(' ');
}

async function main() {
    const src = await simplified(srcFile, srcMapFile);
    const dst = await simplified(dstFile, dstMapFile);
    const S = analyze(src.code);
    const D = analyze(dst.code);
    const s2d = new Map();
    const d2s = new Map();
    const match = (s, d, why) => {
        if (s2d.has(s) || d2s.has(d)) return false;
        s2d.set(s, d);
        d2s.set(d, s);
        reasons[why] = (reasons[why] || 0) + 1;
        return true;
    };
    const reasons = {};

    // Anchors: identical exported names.
    const srcByExport = new Map();
    for (const b of S.bindings.values()) for (const e of b.exports) srcByExport.set(e, b.name);
    for (const b of D.bindings.values()) for (const e of b.exports) if (srcByExport.has(e)) match(srcByExport.get(e), b.name, 'export');

    for (let round = 0; round < 50; round++) {
        let progress = 0;
        const fps = (info, labelOf, matched) => {
            const res = new Map();
            for (const b of info.bindings.values()) {
                if (!b.parts.length) continue;
                const refs = [];
                const fp = fingerprint(info, b, labelOf, refs);
                res.set(b.name, { fp, refs, matched: matched.has(b.name) });
            }
            return res;
        };
        // Labels: matched pairs share the source name.
        const sf = fps(S, (n) => (s2d.has(n) ? n : '?'), s2d);
        const df = fps(D, (n) => (d2s.has(n) ? d2s.get(n) : '?'), d2s);
        const byFp = (m, onlyUnmatched) => {
            const r = new Map();
            for (const [name, v] of m) {
                if (onlyUnmatched && v.matched) continue;
                (r.get(v.fp) || r.set(v.fp, []).get(v.fp)).push(name);
            }
            return r;
        };
        // 1. Unique fingerprints among unmatched bindings.
        const su = byFp(sf, true);
        const du = byFp(df, true);
        for (const [fp, names] of su) {
            const other = du.get(fp);
            if (names.length === 1 && other && other.length === 1 && match(names[0], other[0], 'fingerprint')) progress++;
        }
        // 2. Matched pairs with identical fingerprints: their unknown references line up.
        for (const [s, d] of s2d) {
            const a = sf.get(s);
            const b = df.get(d);
            if (!a || !b || a.fp !== b.fp || a.refs.length !== b.refs.length) continue;
            a.refs.forEach((r, i) => {
                const q = b.refs[i];
                if (!s2d.has(r) && !d2s.has(q) && match(r, q, 'reference')) progress++;
            });
        }
        if (!progress) break;
    }

    const srcNames = src.map.vars || {};
    const dstMap = dst.map;
    dstMap.vars = dstMap.vars || {};
    const used = new Set(Object.values(dstMap.vars));
    let added = 0;
    let unnamedInSrc = 0;
    for (const [s, d] of s2d) {
        const name = srcNames[s];
        if (!name) {
            unnamedInSrc++;
            continue;
        }
        if (dstMap.vars[d] || used.has(name)) continue;
        dstMap.vars[d] = name;
        used.add(name);
        added++;
    }
    const total = D.bindings.size;
    console.log(
        `${dstFile.split('/').pop()}: matched ${s2d.size}/${total} top-level bindings ` +
            `(${Object.entries(reasons).map(([k, v]) => `${v} by ${k}`).join(', ')}); ` +
            `${added} names to add` + (unnamedInSrc ? `, ${unnamedInSrc} matched but unnamed in source` : '')
    );
    if (write) fs.writeFileSync(dstMapFile, JSON.stringify(dstMap, null, 4) + '\n');
    if (report) {
        const firstLine = (info, n) => {
            const p = info.bindings.get(n).parts[0];
            return p ? generate(p.node).code.replace(/\s+/g, ' ').slice(0, 90) : '(no init)';
        };
        const lines = [];
        for (const [s, d] of s2d) lines.push(`${srcNames[s] || s}\n    src ${s}: ${firstLine(S, s)}\n    dst ${d}: ${firstLine(D, d)}`);
        fs.writeFileSync(report, lines.join('\n') + '\n');
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
