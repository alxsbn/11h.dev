#!/usr/bin/env python3
"""Recadre les 4 captures de presse fournies par l'utilisateur (Pictures/Screenshots)
et les écrit dans assets/press/ aux noms attendus par deck.json.

Crop conservateur : on enlève surtout la barre de navigation du haut quand elle existe,
on garde le masthead de la source (identité 'coupure de presse'). Valeurs ajustables.
"""
from PIL import Image
from pathlib import Path

SRC = Path.home() / "Pictures" / "Screenshots"
OUT = Path(__file__).resolve().parent.parent / "assets" / "press"
OUT.mkdir(parents=True, exist_ok=True)

# (fichier source, nom sortie, crop (left, top, right, bottom) ou None pour garder tel quel)
# top relevé pour couper la nav ; bottom pour couper un pied de page éventuel.
JOBS = [
    # Fortune : recherche + masthead + nav en haut → couper jusqu'à l'article (~100px)
    ("Screenshot from 2026-06-25 15-58-57.png", "01-fortune.png",       (0, 100, 1387, 712)),
    # Forbes : fin bandeau noir en haut, garde tout le reste
    ("Screenshot from 2026-06-25 15-58-36.png", "02-forbes.png",        (0, 0, 1256, 748)),
    # Economist : nav (sections) sous le masthead — on garde masthead + titre, coupe la nav
    #  masthead ~0-55, nav ~55-95 ; on garde masthead puis recolle le titre → simple: garde tout sauf bas
    ("Screenshot from 2026-06-25 15-58-18.png", "03-economist.png",     (0, 0, 1530, 766)),
    # Business Times : déjà propre
    ("Screenshot from 2026-06-25 15-57-59.png", "04-businesstimes.png", None),
    # TechCrunch : barre de nav noire en haut → couper ~42px, garde l'illustration + titre vert
    ("Screenshot from 2026-06-25 17-07-13.png", "05-techcrunch.png",    (0, 42, 1284, 739)),
    # Forbes #2 : fin bandeau nav en haut → couper ~22px
    ("Screenshot from 2026-06-25 17-05-29.png", "06-forbes-500.png",    (0, 22, 1037, 845)),
]

for src_name, out_name, box in JOBS:
    im = Image.open(SRC / src_name).convert("RGB")
    if box:
        im = im.crop(box)
    im.save(OUT / out_name, "PNG")
    print(f"{out_name:24} <- {src_name}  {im.size}")

print(f"\nÉcrit dans {OUT}")
