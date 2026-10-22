// Runs the whole pipeline for the 2012 bundles:
//
//   js_raw/<f>.js  --unminify-->  js_unminified/<f>.js  --maps/<name>.json-->  js_src/<f>.js  --check
//
//   node build.js [name ...]     e.g. node build.js www-core
//
// <name> is the file name without the -vflXXXX build hash.

const fs = require('fs');
const path = require('path');
const { unminify } = require('./unminify');
const { rename } = require('./rename');
const { check } = require('./check');

const ASSETS = path.resolve(__dirname, '../../static/site_assets/2012');
const RAW = path.join(ASSETS, 'js_raw');
const UNMIN = path.join(ASSETS, 'js_unminified');
const SRC = path.join(ASSETS, 'js_src');
const MAPS = path.join(__dirname, 'maps');

const bundleName = (file) => file.replace(/-vfl[\w-]+\.js$/, '');

async function main() {
    const only = process.argv.slice(2);
    fs.mkdirSync(UNMIN, { recursive: true });
    fs.mkdirSync(SRC, { recursive: true });
    let ok = true;
    for (const file of fs.readdirSync(RAW).filter((f) => f.endsWith('.js')).sort()) {
        const name = bundleName(file);
        if (only.length && !only.includes(name)) continue;
        const unminified = await unminify(fs.readFileSync(path.join(RAW, file), 'utf8'));
        fs.writeFileSync(path.join(UNMIN, file), unminified);
        const mapFile = path.join(MAPS, name + '.json');
        const map = fs.existsSync(mapFile) ? JSON.parse(fs.readFileSync(mapFile, 'utf8')) : {};
        try {
            fs.writeFileSync(path.join(SRC, file), await rename(unminified, map));
        } catch (e) {
            console.log(`${name}: rename failed: ${e.message}`);
            ok = false;
            continue;
        }
        const counts = ['vars', 'locals', 'props'].map((k) => `${Object.keys(map[k] || {}).length} ${k}`).join(', ');
        console.log(`${name}: renamed (${counts})`);
        ok = check(path.join(RAW, file), path.join(SRC, file), undefined, undefined, map.props || {}) && ok;
    }
    process.exit(ok ? 0 : 1);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
