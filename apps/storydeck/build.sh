#!/usr/bin/env bash
# Régénère talk.html (fichier autoportant ouvrable en file://) depuis les sources :
#   index.html (CSS + markup) · engine.js (moteur) · deck.json (contenu)
# Les images assets/press/*.png sont inlinées en data-URI base64 pour que
# talk.html fonctionne en file:// (où <img src="assets/..."> casse comme fetch — CORS).
# index.html, lui, garde des chemins relatifs (à servir via http://localhost).
#
# Usage : bash build.sh
set -euo pipefail
cd "$(dirname "$0")"

python3 - <<'PYEOF'
import re, json, base64, pathlib

root = pathlib.Path(".")
html = (root / "index.html").read_text()
css = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
brand = re.search(r'(<a id="brand".*?</a>)', html, re.S).group(1)

engine = (root / "engine.js").read_text()
engine = engine.replace("export async function mountDeck(rootSel, deckUrl) {",
                        "async function mountDeck(rootSel, deck) {")
engine = engine.replace("  const deck = await fetch(deckUrl).then((r) => r.json());\n", "")

deck = json.loads((root / "deck.json").read_text())

# Inline les images des drops (et tout autre champ img) en data-URI.
def inline_img(path):
    p = root / path
    if not p.exists():
        raise SystemExit(f"build.sh: image manquante {path} — lance d'abord node scripts/capture-press.mjs")
    b64 = base64.b64encode(p.read_bytes()).decode()
    return f"data:image/png;base64,{b64}"

# N'inline que les chemins locaux (assets/...). Les URLs http(s) restent telles quelles.
def is_local(v):
    return isinstance(v, str) and not v.startswith(("data:", "http://", "https://"))

n_inlined = 0
for scene in deck.get("scenes", []):
    # fond de scène (champ media)
    if is_local(scene.get("media")):
        scene["media"] = inline_img(scene["media"]); n_inlined += 1
    # poster d'embed (screenshot affiché avant la vidéo)
    if is_local(scene.get("poster")):
        scene["poster"] = inline_img(scene["poster"]); n_inlined += 1
    # capture côté liste (list image)
    if is_local(scene.get("image")):
        scene["image"] = inline_img(scene["image"]); n_inlined += 1
    # coupures de presse (drops)
    for d in scene.get("drops", []) or []:
        if is_local(d.get("img")):
            d["img"] = inline_img(d["img"]); n_inlined += 1
    # marquee (rows[].items[].img) — garde : le type 'table' a aussi des 'rows' (listes, pas dicts)
    for row in scene.get("rows", []) or []:
        if not isinstance(row, dict):
            continue
        for it in row.get("items", []) or []:
            if is_local(it.get("img")):
                it["img"] = inline_img(it["img"]); n_inlined += 1
    # stack (items[].img) — logos de la stack data
    for it in scene.get("items", []) or []:
        if isinstance(it, dict) and is_local(it.get("img")):
            it["img"] = inline_img(it["img"]); n_inlined += 1

deck_js = json.dumps(deck, ensure_ascii=False)

out = f'''<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>StoryDeck</title>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<style>{css}</style>
</head>
<body>
  <div id="progress"></div>
  {brand}
  <nav id="dots" aria-label="Aller à la scène"></nav>
  <main id="deck"></main>
  <div id="hint">↓ molette, → flèche ou clic pour avancer</div>
  <script>
const DECK = {deck_js};
{engine}
mountDeck("#deck", DECK);
  </script>
</body>
</html>
'''
(root / "talk.html").write_text(out)

# Garde-fous
assert "fetch(" not in out, "fetch resté dans talk.html"
assert "export" not in out.split("<script>")[1], "export resté"
assert out.count('viewBox="0 0 424.72 111.64"') == 1, "logo manquant/dupliqué"
print(f"talk.html régénéré — {len(out)} octets · {n_inlined} image(s) inlinée(s)")
PYEOF
