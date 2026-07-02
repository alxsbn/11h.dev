// Capture 4 coupures de presse pour la scène SaaSpocalypse du deck.
// Tente une vraie capture Playwright (recadrée). Si ça échoue → carte fallback stylisée.
// Sortie : assets/press/0X-*.png + un log clair réel-vs-fallback.
//
// Usage : node scripts/capture-press.mjs
// Chromium présent dans ~/.cache/ms-playwright ; réseau externe OK (vérifié).

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, statSync } from "node:fs";
import { renderCard } from "./render-card.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "assets", "press");
mkdirSync(OUT, { recursive: true });

// Les 4 sources. `url` = capture réelle ; `crop` = zone à recadrer (optionnel) ;
// `fallback` = spec de la carte stylisée si la capture rate.
// Les URLs sont remplies après vérification (sous-agent). null = fallback direct.
const SOURCES = [
  {
    file: "01-salesforce.png",
    // Motley Fool & CNBC ont un bouton flottant qui chevauche le titre au crop → fallback carte propre,
    // qui porte en plus le −20 % et la mention "pas l'IA" (garde-fou de la note).
    url: null,
    selector: "h1",
    fallback: {
      source: "CNBC", date: "30 mai 2024",
      title: "Salesforce shares tumble 20% in worst day since 2004",
      stat: "−20 %", statLabel: "Pire séance depuis 2004 — miss de croissance, pas l'IA",
      accent: "#0b7"
    }
  },
  {
    file: "02-claude-cowork.png",
    url: "https://www.pymnts.com/news/artificial-intelligence/2026/anthropic-says-new-cowork-plugins-tailor-claude-specific-job-functions/",
    selector: "h1",
    fallback: {
      source: "PYMNTS", date: "30 jan. 2026",
      title: "Anthropic « Cowork » : des plugins qui adaptent Claude à chaque métier",
      stat: "L'agent devient l'interface", statLabel: "Juridique · Ventes · Finance · RH",
      accent: "#c63"
    }
  },
  {
    file: "03-saaspocalypse.png",
    // Bloomberg = paywall + 403 ; Taskade est accessible et chiffré (285 Md$, TR −16 %, LegalZoom −20 %).
    url: "https://www.taskade.com/blog/saaspocalypse-explained",
    altUrl: "https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks",
    selector: "h1",
    fallback: {
      source: "Bloomberg", date: "Février 2026",
      title: "Thomson Reuters −16 %, LegalZoom −20 % : la panique SaaS",
      stat: "≈ 285 Md$", statLabel: "Effacés en 48 heures sur le software",
      accent: "#d11"
    }
  },
  {
    file: "04-trillion.png",
    url: "https://www.bulloak.com/blog/the-2026-saaspocalypse-what-the-ai-software-selloff-means-for-your-portfolio/",
    altUrl: "https://www.taskade.com/blog/saaspocalypse-explained",
    selector: "h1",
    fallback: {
      source: "Presse marché", date: "Février 2026",
      title: "« SaaSpocalypse » : plus gros repricing depuis la bulle dot-com",
      stat: "≈ 1 000 Md$", statLabel: "Capitalisation software effacée en 1-2 semaines",
      accent: "#d11"
    }
  }
];

// Ferme les bandeaux cookies les plus courants (best-effort, non bloquant).
async function dismissCookies(page) {
  const sels = [
    'button:has-text("Accept")', 'button:has-text("Accepter")',
    'button:has-text("I agree")', 'button:has-text("Tout accepter")',
    '[aria-label*="accept" i]', '#onetrust-accept-btn-handler'
  ];
  for (const s of sels) {
    try { const b = await page.$(s); if (b) { await b.click({ timeout: 1500 }); break; } } catch {}
  }
}

async function captureUrl(page, url, src, outPath) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
  await dismissCookies(page);
  await page.waitForTimeout(1500);
  // capture le titre + un bloc de contexte autour (article header)
  const target = src.selector ? await page.$(src.selector) : null;
  if (target) {
    const box = await target.boundingBox();
    if (box) {
      const pad = 24;
      await page.screenshot({
        path: outPath,
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: Math.min(820, box.width + pad * 2),
          height: box.height + pad * 2
        }
      });
    } else {
      await target.screenshot({ path: outPath });
    }
  } else {
    await page.screenshot({ path: outPath, clip: src.crop || { x: 0, y: 0, width: 720, height: 480 } });
  }
  const sz = statSync(outPath).size;
  if (sz < 3000) throw new Error("capture trop petite");
  return { mode: "capture", out: outPath, bytes: sz, from: url };
}

async function tryCapture(page, src, outPath) {
  for (const url of [src.url, src.altUrl].filter(Boolean)) {
    try { return await captureUrl(page, url, src, outPath); }
    catch (e) { /* essaie l'URL suivante, puis le fallback */ }
  }
  return null;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const report = [];

for (const src of SOURCES) {
  const outPath = join(OUT, src.file);
  let res = await tryCapture(page, src, outPath);
  if (!res) res = await renderCard(page, src.fallback, outPath);
  report.push(`${src.file.padEnd(22)} → ${res.mode}${res.bytes ? ` (${res.bytes} o)` : ""}`);
}

await browser.close();
console.log("\n=== Coupures générées ===");
report.forEach((r) => console.log("  " + r));
console.log(`\nDossier : ${OUT}`);
