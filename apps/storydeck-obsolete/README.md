# Talk « AI will make your organization obsolete. If you have one »

Portage en deck HTML du Google Slides du même nom (version du 2026-11-02). Moteur copié
de `storydeck-agentic` (thème crème, Playfair, soupe cellulaire WebGL). Publié sur
`/talk/ai-organization-obsolete/` (`sitemap: false`, `noindex`).

## Lancer

```bash
cd apps/storydeck-obsolete
python3 -m http.server 8899   # dev : édite deck.json, rafraîchis http://localhost:8899/index.html
bash build.sh                 # présentation : régénère talk.html autoportant (file://, offline)
```

Navigation : clic, flèche →, molette pour avancer ; flèche ← pour reculer.

## Scènes

| # | Slide Google | Scène | Clic |
|---|---|---|---|
| 1 | Titre | `title` | |
| 2 | Le Baptême du Christ + Verrocchio | `atelier` | le portrait se pose |
| 3 | Stradanus, *Color Olivi* | `atelier` (solo) | |
| 4 | Détail des anges + Léonard | `atelier` | le portrait se pose |
| 5 | Jolimoi × Urban Sketchers | `duo` | |
| 6 | Head of Data + 4 analystes | `cellular` | équipe → IA → absorption |

La séquence « IA puis absorption » de la scène 6 est une proposition, sans légende :
à écrire ou à retirer dans `deck.json`.

## Ajouts au moteur (par rapport à storydeck-agentic)

- `atelier` : tableau en panneau à gauche (touche trois bords, rogné jamais étiré) ;
  `portrait` + `name` + `dates` posés au clic dans la moitié droite. Sans `portrait`,
  le tableau seul, centré.
- `duo` : `images: [a, b]`, deux logos séparés par « × ».
- `cellular` : `together: true` sur un beat fait apparaître tout son `add` en un clic
  (au lieu d'un clic par cellule).
- `build.sh` inline aussi le champ `portrait`.
- Ce deck masque l'enseigne, l'aide de navigation et la frise datée.
