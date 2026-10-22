// Merges new top-level names into a bundle's rename map.
//
//   node addnames.js <map.json> <entries.json>          entries: { "minified": "new$name", ... }
//   node addnames.js <map.json> --exports <bundle.js>    names taken from goog$exportSymbol("a.b", x) calls
//   node addnames.js <map.json> --props <entries.json>   property names instead of top-level names
//
// Existing entries are kept; conflicts and duplicate target names are reported, not applied.

const fs = require('fs');

const argv = process.argv.slice(2);
const section = argv.includes('--props') ? 'props' : 'vars';
const [mapFile, ...rest] = argv.filter((a) => a !== '--props');
if (!mapFile || !rest.length) {
    console.error('usage: node addnames.js <map.json> <entries.json> | --exports <bundle.js>');
    process.exit(2);
}
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
map[section] = map[section] || {};
const target = map[section];

let entries = {};
if (rest[0] === '--exports') {
    const code = fs.readFileSync(rest[1], 'utf8');
    const byId = {};
    for (const m of code.matchAll(/goog\$exportSymbol\("([^"]+)", ([A-Za-z_$][\w$]*)\)/g)) {
        if (m[2].includes('$') && m[2].length > 3) continue; // already renamed
        (byId[m[2]] = byId[m[2]] || new Set()).add(m[1]);
    }
    for (const [id, names] of Object.entries(byId)) {
        const pick = [...names].find((n) => n.startsWith('yt.') || n.startsWith('goog.')) || [...names][0];
        entries[id] = pick.replace(/\./g, '$');
    }
} else {
    entries = JSON.parse(fs.readFileSync(rest[0], 'utf8'));
}

const used = new Set(Object.values(target));
let added = 0;
for (const [from, to] of Object.entries(entries)) {
    if (target[from]) {
        if (target[from] !== to) console.log(`keep ${from}=${target[from]} (not ${to})`);
        continue;
    }
    if (used.has(to)) {
        console.log(`duplicate target ${to} for ${from}, skipped`);
        continue;
    }
    target[from] = to;
    used.add(to);
    added++;
}
fs.writeFileSync(mapFile, JSON.stringify(map, null, 4) + '\n');
console.log(`added ${added} ${section}, total ${Object.keys(target).length}`);
