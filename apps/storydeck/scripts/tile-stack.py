#!/usr/bin/env python3
"""Prépare les logos de la stack en PNG transparents recadrés (PAS de carré blanc) :
les logos s'affichent directement sur le fond sombre du deck, en grand.

- SVG (simpleicons colorés, AWS IcePanel) → PNG transparent via convert
- PNG fournis (census_new.png, dbt_new.png) → recadrés (trim) tels quels
Sortie : assets/stack/tiles/<id>.png (transparent, détouré)
"""
import subprocess, pathlib
from PIL import Image

STACK = pathlib.Path(__file__).resolve().parent.parent / "assets" / "stack"
TILES = STACK / "tiles"; TILES.mkdir(parents=True, exist_ok=True)
RENDER_H = 240  # haute résolution, l'affichage gère la taille finale

def trim(img):
    """Recadre sur le contenu non transparent."""
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img

def from_svg(svg, out):
    tmp = STACK / "_tmp.png"
    subprocess.run(["convert", "-background", "none", "-density", "300",
                    str(svg), "-resize", f"x{RENDER_H}", str(tmp)], check=True)
    img = trim(Image.open(tmp).convert("RGBA"))
    img.save(out, "PNG"); tmp.unlink()

def from_png(src, out):
    img = trim(Image.open(src).convert("RGBA"))
    # remet à hauteur cible
    if img.height != RENDER_H:
        r = RENDER_H / img.height
        img = img.resize((int(img.width * r), RENDER_H), Image.LANCZOS)
    img.save(out, "PNG")

# SVG disponibles (logos colorés)
svg_ids = ["rds", "dms", "airbyte", "databricks", "fivetran", "metabase", "claude"]
for i in svg_ids:
    svg = STACK / f"{i}.svg"
    if svg.exists():
        from_svg(svg, TILES / f"{i}.png"); print(f"{i:12} (svg) OK")
    else:
        print(f"{i:12} SVG manquant")

# PNG fournis par l'utilisateur (vrais logos)
from_png(STACK / "census_new.png", TILES / "census.png"); print("census       (png) OK")
from_png(STACK / "dbt_new.png",    TILES / "dbt.png");    print("dbt          (png) OK")
