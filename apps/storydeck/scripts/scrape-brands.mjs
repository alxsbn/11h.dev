// Télécharge les logos de marques depuis deviensstyliste.jolimoi.com/marques
// vers assets/brands/, et écrit assets/brands/brands.json (liste {name, file}).
// Les logos sont des PNG nommés (alt = nom de marque). Dédupliqué.

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "assets", "brands");
mkdirSync(OUT, { recursive: true });

const URL = "https://deviensstyliste.jolimoi.com/marques";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);

// Récupère les images de marque (sous /assets/images/, alt non vide, hors collage & logo Jolimoi)
const imgs = await page.$$eval("img", (els) => els.map((e) => ({
  src: e.currentSrc || e.src, alt: e.alt || ""
})));

const seen = new Set();
const brands = [];
for (const { src, alt } of imgs) {
  if (!src.includes("/assets/images/")) continue;
  if (!alt || /jolimoi/i.test(alt) || /collage/i.test(alt)) continue;
  if (seen.has(alt)) continue;
  seen.add(alt);
  // nom de fichier sûr
  const file = alt.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".png";
  brands.push({ name: alt, file, src });
}

console.log(`Marques uniques : ${brands.length}`);
let ok = 0;
for (const b of brands) {
  try {
    const resp = await page.request.get(b.src);
    if (!resp.ok()) { console.log(`  ✗ ${b.name} (${resp.status()})`); continue; }
    writeFileSync(join(OUT, b.file), await resp.body());
    ok++;
  } catch (e) { console.log(`  ✗ ${b.name} (${e.message})`); }
}

// brands.json sans le champ src (chemins locaux)
writeFileSync(join(OUT, "brands.json"),
  JSON.stringify(brands.map(({ name, file }) => ({ name, file })), null, 2));

await browser.close();
console.log(`\nTéléchargés : ${ok}/${brands.length} → ${OUT}`);
console.log(`Liste : assets/brands/brands.json`);
