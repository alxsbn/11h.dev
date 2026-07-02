#!/usr/bin/env python3
"""Normalise les logos de marque en tuiles uniformes pour le marquee.
Chaque logo (souvent noir sur transparent) est centré sur une tuile blanche
arrondie de hauteur fixe, avec padding — pour un ruban régulier et lisible
sur le fond sombre du deck.

Entrée : assets/brands/*.png (+ brands.json)
Sortie : assets/brands/tiles/<file> (mêmes noms) + tiles/brands.json
"""
from PIL import Image
from pathlib import Path
import json

BRANDS = Path(__file__).resolve().parent.parent / "assets" / "brands"
TILES = BRANDS / "tiles"
TILES.mkdir(parents=True, exist_ok=True)

TILE_H = 160          # hauteur de la tuile (px)
TILE_W = 320          # largeur de la tuile
PAD = 28              # marge interne autour du logo
RADIUS = 18           # coins arrondis
BG = (255, 255, 255, 255)

def rounded_mask(size, radius):
    from PIL import ImageDraw
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0]-1, size[1]-1], radius=radius, fill=255)
    return m

brands = json.load(open(BRANDS / "brands.json"))
out = []
for b in brands:
    src = BRANDS / b["file"]
    if not src.exists():
        continue
    logo = Image.open(src).convert("RGBA")
    # zone utile dispo dans la tuile
    avail_w, avail_h = TILE_W - 2*PAD, TILE_H - 2*PAD
    # redimensionne le logo en gardant le ratio pour tenir dans la zone
    ratio = min(avail_w / logo.width, avail_h / logo.height)
    new = (max(1, int(logo.width * ratio)), max(1, int(logo.height * ratio)))
    logo = logo.resize(new, Image.LANCZOS)
    # tuile blanche + logo centré, composé sur l'alpha du logo
    tile = Image.new("RGBA", (TILE_W, TILE_H), BG)
    ox, oy = (TILE_W - new[0]) // 2, (TILE_H - new[1]) // 2
    tile.alpha_composite(logo, (ox, oy))
    # coins arrondis
    tile.putalpha(rounded_mask((TILE_W, TILE_H), RADIUS))
    tile.save(TILES / b["file"], "PNG")
    out.append({"name": b["name"], "file": b["file"]})

json.dump(out, open(TILES / "brands.json", "w"), ensure_ascii=False, indent=2)
print(f"{len(out)} tuiles générées ({TILE_W}x{TILE_H}) → {TILES}")
