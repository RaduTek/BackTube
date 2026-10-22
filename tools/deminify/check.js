// Verifies a processed bundle against its raw original.
//
//   node check.js <raw.js> <processed.js> [--with <core-raw.js> <core-processed.js>]
//
// 1. The processed file must parse as ES5.
// 2. Both files are loaded in jsdom and every global they create is compared
//    recursively: keys, function arity and prototype methods. Script errors are
//    reported for both. Renaming properties changes the shape only where those
//    properties hang off exported objects, so a mismatch is listed path by path.

const fs = require('fs');
const acorn = require('acorn');
const { JSDOM, VirtualConsole } = require('jsdom');

function shape(v, depth, seen) {
    if (v === null || (typeof v !== 'object' && typeof v !== 'function')) return typeof v;
    if (seen.has(v)) return '<cycle>';
    if (depth > 6) return typeof v;
    seen.add(v);
    const o = {};
    let fnKeys = 0;
    for (const k of Object.keys(v).sort()) {
        if (/^closure_uid_/.test(k)) continue;
        // listener maps keyed by function source text differ only in formatting
        const key = /^function\s*[\w$]*\s*\(/.test(k) ? '<fnkey' + fnKeys++ + '>' : k;
        o[key] = shape(v[k], depth + 1, seen);
    }
    if (typeof v === 'function') {
        o['<arity>'] = v.length;
        o['<proto>'] = Object.keys(v.prototype || {}).sort().join(',');
    }
    return o;
}

function load(files) {
    const errors = [];
    const vc = new VirtualConsole();
    vc.on('jsdomError', (e) => errors.push(String(e.message || e).slice(0, 200)));
    const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
        runScripts: 'outside-only',
        virtualConsole: vc,
        url: 'http://www.youtube.com/'
    });
    const w = dom.window;
    const before = new Set(Object.getOwnPropertyNames(w));
    for (const f of files) {
        try {
            w.eval(fs.readFileSync(f, 'utf8'));
        } catch (e) {
            errors.push('THROW ' + f.split('/').pop() + ': ' + e.message);
        }
    }
    const g = {};
    for (const k of Object.getOwnPropertyNames(w).filter((k) => !before.has(k)).sort()) g[k] = shape(w[k], 0, new Set());
    dom.window.close();
    return { shape: g, errors };
}

function diff(a, b, path, out) {
    if (JSON.stringify(a) === JSON.stringify(b)) return;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diff(a[k], b[k], path + '.' + k, out);
    } else out.push(`${path}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);
}

function check(rawFile, outFile, withRaw, withOut) {
    const name = rawFile.split('/').pop();
    let ok = true;
    try {
        acorn.parse(fs.readFileSync(outFile, 'utf8'), { ecmaVersion: 5 });
    } catch (e) {
        console.log(`${name}: NOT ES5 (${e.message})`);
        ok = false;
    }
    const a = load([withRaw, rawFile].filter(Boolean));
    const b = load([withOut, outFile].filter(Boolean));
    const d = [];
    diff(a.shape, b.shape, '', d);
    if (d.length) {
        ok = false;
        console.log(`${name}: exported shape differs`);
        for (const line of d.slice(0, 30)) console.log('  ' + line);
        if (d.length > 30) console.log(`  ... ${d.length - 30} more`);
    }
    if (JSON.stringify(a.errors) !== JSON.stringify(b.errors)) {
        ok = false;
        console.log(`${name}: errors differ\n  raw: ${JSON.stringify(a.errors)}\n  out: ${JSON.stringify(b.errors)}`);
    }
    if (ok) console.log(`${name}: OK (ES5, ${Object.keys(a.shape).length} globals identical, errors: ${a.errors.length})`);
    return ok;
}

module.exports = { check };

if (require.main === module) {
    const args = process.argv.slice(2);
    const w = args.indexOf('--with');
    const [withRaw, withOut] = w >= 0 ? args.splice(w, 3).slice(1) : [];
    const [rawFile, outFile] = args;
    if (!rawFile || !outFile) {
        console.error('usage: node check.js <raw.js> <processed.js> [--with <core-raw.js> <core-processed.js>]');
        process.exit(2);
    }
    process.exit(check(rawFile, outFile, withRaw, withOut) ? 0 : 1);
}
