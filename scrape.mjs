import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://store.plusmember.jp/equallove/products/list.php';
const TOTAL_PAGES = 15;
const sets = [];

for (let page = 1; page <= TOTAL_PAGES; page++) {
  const url = `${BASE}?cross=0&mode=&name=&category_id=1071&pageno=${page}&sale_save=&sort_save=2&dispnum_save=50`;
  process.stdout.write(`[${page}/${TOTAL_PAGES}] fetching... `);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    // <h3>生写真セット...</h3> を抽出
    const re = /<h3[^>]*>(生写真セット[^<]+|[^<]*生写真セット[^<]+)<\/h3>/g;
    let m, found = 0;
    while ((m = re.exec(html)) !== null) {
      const name = m[1].trim().replace(/\s+/g, ' ');
      if (!sets.find(s => s.name === name)) {
        sets.push({ name });
        found++;
      }
    }
    console.log(`${found}件追加`);
    await new Promise(r => setTimeout(r, 400));
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
  }
}

console.log(`\n合計 ${sets.length} 件\n`);

const lines = sets.map((s, i) =>
  `  { id: "set${String(i+1).padStart(3,'0')}", name: "${s.name}", date: "" },`
).join('\n');

const out = `export const MEMBERS = [
  "大谷映美里",
  "大場花菜",
  "音嶋莉沙",
  "齋藤樹愛羅",
  "佐々木舞香",
  "髙松瞳",
  "瀧脇笙古",
  "野口衣織",
  "諸橋沙夏",
  "山本杏奈"
]

export const PHOTO_SETS = [
${lines}
]
`;

const outPath = join(__dirname, 'src', 'data', 'photoSets.js');
writeFileSync(outPath, out, 'utf8');
console.log(`photoSets.js を更新しました: ${outPath}`);
sets.forEach((s, i) => console.log(`  ${String(i+1).padStart(3)}. ${s.name}`));
