// Filme deathbyclawd.com (fivetran) en action via Playwright (vidéo de session).
// Sortie : assets/video/deathbyclawd.webm (puis converti en mp4 par le shell).
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, readdirSync, renameSync } from "node:fs";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dir, "..", "assets", "video");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: OUT, size: { width: 1280, height: 720 } }
});
const page = await ctx.newPage();
await page.goto("https://deathbyclawd.com/?url=fivetran.com", { waitUntil: "networkidle", timeout: 45000 });

// masque les boutons de partage social (Share on X / LinkedIn / Copy Link)
await page.addStyleTag({ content: `
  a[href*="twitter"], a[href*="x.com"], a[href*="linkedin"],
  button, [class*="share" i], [class*="Share" i] { display: none !important; }
`}).catch(() => {});
// repli : masque tout élément contenant ces libellés
await page.evaluate(() => {
  document.querySelectorAll("a,button,div").forEach((e) => {
    const t = (e.textContent || "").trim();
    if (/^(Share on X|Share on LinkedIn|Copy Link)$/i.test(t)) e.style.display = "none";
  });
}).catch(() => {});

// laisse l'animation se dérouler
await page.waitForTimeout(14000);
await ctx.close(); // flush la vidéo
await browser.close();

// renomme la vidéo générée (nom aléatoire) en deathbyclawd.webm
const webm = readdirSync(OUT).find((f) => f.endsWith(".webm") && f !== "deathbyclawd.webm");
if (webm) { renameSync(join(OUT, webm), join(OUT, "deathbyclawd.webm")); console.log("vidéo:", webm, "→ deathbyclawd.webm"); }
else console.log("AUCUNE vidéo générée");
