// Merges hand-written "locals" entries into a map (existing per-function names are kept).
//
//   node mergelocals.js <map.json> <entries.json>     entries: { "<locals key>": { "a": "name", ... } }

const fs = require('fs');
const [mapFile, entriesFile] = process.argv.slice(2);
const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
const entries = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
map.locals = map.locals || {};
let n = 0;
for (const [key, renames] of Object.entries(entries)) {
    const cur = (map.locals[key] = map.locals[key] || {});
    for (const [from, to] of Object.entries(renames)) {
        if (!(from in cur)) {
            cur[from] = to;
            n++;
        }
    }
}
fs.writeFileSync(mapFile, JSON.stringify(map, null, 4) + '\n');
console.log(`merged ${n} local names into ${Object.keys(entries).length} functions`);
