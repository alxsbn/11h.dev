// Fallback : rend une "une de presse" stylisée en PNG via Playwright.
// Utilisé quand une capture réelle échoue (paywall, anti-bot, page cassée).
// Usage interne : importé par capture-press.mjs → renderCard(page, spec, outPath).

// Une de presse : bandeau source + date, gros titre, chiffre choc rouge.
export function cardHTML({ source, date, title, stat, statLabel, accent = "#d11" }) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { margin: 0; box-sizing: border-box; }
    body { width: 720px; font-family: Georgia, "Times New Roman", serif; background: #fff; color: #111; }
    .card { padding: 40px 44px; }
    .masthead { display: flex; justify-content: space-between; align-items: baseline;
      border-bottom: 3px solid #111; padding-bottom: 10px; margin-bottom: 22px; }
    .source { font-family: -apple-system, "Helvetica Neue", sans-serif; font-weight: 800;
      font-size: 24px; letter-spacing: -.5px; text-transform: uppercase; }
    .date { font-family: -apple-system, sans-serif; font-size: 13px; color: #666; }
    .kicker { font-family: -apple-system, sans-serif; font-size: 12px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 1px; color: ${accent}; margin-bottom: 10px; }
    h1 { font-size: 38px; line-height: 1.12; font-weight: 700; margin-bottom: 22px; }
    .stat { font-family: -apple-system, sans-serif; font-weight: 900; font-size: 84px;
      line-height: 1; color: ${accent}; letter-spacing: -3px; }
    .stat-label { font-family: -apple-system, sans-serif; font-size: 15px; color: #444; margin-top: 8px; }
  </style></head><body>
    <div class="card" id="card">
      <div class="masthead"><div class="source">${source}</div><div class="date">${date}</div></div>
      <div class="kicker">Marchés · Tech</div>
      <h1>${title}</h1>
      ${stat ? `<div class="stat">${stat}</div>` : ""}
      ${statLabel ? `<div class="stat-label">${statLabel}</div>` : ""}
    </div>
  </body></html>`;
}

// Rend la carte dans une page Playwright déjà ouverte et screenshot l'élément #card.
export async function renderCard(page, spec, outPath) {
  await page.setContent(cardHTML(spec), { waitUntil: "load" });
  const el = await page.$("#card");
  await el.screenshot({ path: outPath });
  return { mode: "fallback", out: outPath };
}
