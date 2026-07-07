#!/usr/bin/env bash
# Régénère talk.html — fichier AUTOPORTANT ouvrable en file:// (offline, robuste en salle).
# Inline : d3 + p5 (vendor/), cellular.js (module → plain), engine.js (import retiré),
#          deck.json, et les images (data-URI base64).
# Le dev se fait sur index.html (CDN d3/p5 + fetch deck.json) via http://localhost.
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

# fonts conte (Tangerine + Playfair) en @font-face base64 → préfixées au CSS pour l'offline
fonts_css = (root / "vendor/fonts/fonts-inline.css").read_text()
css = fonts_css + "\n" + css

# libs vendorées (offline)
d3 = (root / "vendor/d3.min.js").read_text()
p5 = (root / "vendor/p5.min.js").read_text()

# cellular.js : module ES → plain. On retire l'export, on garde la classe Cellular globale.
cellular = (root / "cellular.js").read_text()
cellular = cellular.replace("export class Cellular", "class Cellular")

# engine.js : retire l'import (Cellular est déjà défini globalement au-dessus),
# et transforme mountDeck(rootSel, deckUrl fetch) → mountDeck(rootSel, deck littéral).
engine = (root / "engine.js").read_text()
engine = re.sub(r'^\s*import \{ Cellular \} from "\./cellular\.js";\s*$', "", engine, flags=re.M)
engine = engine.replace("export async function mountDeck(rootSel, deckUrl) {",
                        "async function mountDeck(rootSel, deck) {")
engine = engine.replace("  const deck = await fetch(deckUrl).then((r) => r.json());\n", "")

deck = json.loads((root / "deck.json").read_text())

# LOGO_MAP : tous les logos de assets/stack/ inlinés en data-URI (offline, file://).
# La soupe cellulaire les charge via ce map quand il existe (sinon chemin relatif en dev).
logo_map = {}
stack = root / "assets/stack"
if stack.is_dir():
    for f in sorted(stack.iterdir()):
        if f.suffix.lower() in (".svg", ".png", ".jpg", ".jpeg"):
            mime = {"svg":"image/svg+xml","png":"image/png","jpg":"image/jpeg","jpeg":"image/jpeg"}[f.suffix.lower().lstrip(".")]
            b64 = base64.b64encode(f.read_bytes()).decode()
            logo_map[f.name] = f"data:{mime};base64,{b64}"
logo_map_js = "const LOGO_MAP = " + json.dumps(logo_map) + ";"

def inline_img(path):
    p = root / path
    if not p.exists():
        raise SystemExit(f"build.sh: image manquante {path}")
    b64 = base64.b64encode(p.read_bytes()).decode()
    mime = "image/jpeg" if p.suffix.lower() in (".jpg", ".jpeg") else "image/png"
    return f"data:{mime};base64,{b64}"

def is_local(v):
    return isinstance(v, str) and not v.startswith(("data:", "http://", "https://"))

n_inlined = 0
for scene in deck.get("scenes", []):
    for key in ("media", "poster", "image"):
        if is_local(scene.get(key)):
            scene[key] = inline_img(scene[key]); n_inlined += 1
    for d in scene.get("drops", []) or []:
        if is_local(d.get("img")):
            d["img"] = inline_img(d["img"]); n_inlined += 1
    for row in scene.get("rows", []) or []:
        if isinstance(row, dict):
            for it in row.get("items", []) or []:
                if is_local(it.get("img")):
                    it["img"] = inline_img(it["img"]); n_inlined += 1
    for it in scene.get("items", []) or []:
        if isinstance(it, dict) and is_local(it.get("img")):
            it["img"] = inline_img(it["img"]); n_inlined += 1

deck_js = json.dumps(deck, ensure_ascii=False)

out = f'''<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>StoryDeck — Agentic Analytics</title>
<style>{css}</style>
</head>
<body>
  <div id="progress"></div>
  {brand}
  <nav id="dots" aria-label="Aller à la scène"></nav>
  <main id="deck"></main>
  <div id="hint">↓ molette, → flèche ou clic pour avancer</div>
  <script>{d3}</script>
  <script>{p5}</script>
  <script>
{logo_map_js}
{cellular}
const DECK = {deck_js};
{engine}
mountDeck("#deck", DECK);
  </script>
</body>
</html>
'''
(root / "talk.html").write_text(out)

# Garde-fous
assert "fetch(" not in out.split("<script>")[-1], "fetch resté dans le script deck"
assert "export class" not in out, "export class resté"
assert "import {" not in out, "import resté"
print(f"talk.html régénéré — {len(out)} octets · {n_inlined} image(s) inlinée(s) · d3+p5 inlinés")
PYEOF
