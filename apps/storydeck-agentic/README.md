# Talk « Once upon a time » — Agentic Analytics (Hymaia Day)

Deck clickable ~20 min, **thème conte de fées** (crème/beige chaud, accents bleu ciel &
rose, typo cursive « once upon a time »). Réutilise le moteur `storydeck` + un moteur
métaball WebGL pour la fable cellulaire. Source narrative :
`vault/Récapitulatif Détaillé — Talk « Agentic Analytics » v2.md`.

## Thème (clair, pour écran géant)

Fond crème `#f6efe4`, encre `#2a2320`, accents bleu ciel `#5b9dd9` & rose `#e8618c`.
Titre en **Tangerine** (cursive conte), chapitres/légendes en **Playfair Display** italic.
La soupe cellulaire tourne sur fond crème (blobs pastel qui rayonnent doucement).
**Pour changer l'image de fond du titre** : remplace `assets/img/hero.jpg` (ou change le
champ `media` de la scène `title` dans `deck.json`) — le voile crème s'adapte.

## Lancer en local

**Mode dev** (hot-reload du contenu — édite `deck.json` et rafraîchis) :

```bash
cd apps/storydeck-agentic
python3 -m http.server 8899
# ouvrir http://localhost:8899/index.html
```

**Mode présentation** (fichier autoportant, offline, robuste en salle) :

```bash
cd apps/storydeck-agentic
bash build.sh          # régénère talk.html (assets images inlinés en base64)
# ouvrir talk.html directement (double-clic / file://)
```

## Navigation

Clic · flèche → · molette : avancer. Flèche ← : reculer. Chaque clic = un *beat*
(dans la soupe cellulaire, un beat mute la population + avance la frise).

## Architecture

| Fichier | Rôle |
|---|---|
| `index.html` | CSS (thème clair conte) + chrome + dev harness (CDN d3/p5 + fetch `deck.json`) |
| `vendor/fonts/` | Tangerine (titre cursif) + Playfair Display (chapitres/légendes) — woff2 + `fonts-inline.css` (base64) |
| `engine.js` | registre de scènes + moteur de progression unifié + charts D3. Renderer `cellular` = délègue au moteur métaball |
| `cellular.js` | **moteur métaball WebGL (p5.js)** — la soupe cellulaire signature + frise fusionnée + voile de chapitre |
| `deck.json` | le contenu du talk (19 scènes) — **édite ici** |
| `vendor/` | `d3.min.js` + `p5.min.js` vendorés (pour le build offline) |
| `build.sh` | inline d3 + p5 + cellular.js + engine.js + deck + images → `talk.html` autoportant |
| `talk.html` | (généré) présentation offline (WebGL fonctionne en `file://`) |
| `preview/` | captures d'écran des moments clés de la fable |

## Le renderer `cellular` (dispositif signature) — métaball WebGL

Moteur **p5.js + shader métaball** (`cellular.js`), dérivé du prototype `cellular-deck`.
Les cellules **fusionnent organiquement** (le champ métaball mélange les couleurs aux
jonctions — ce n'est PAS des cercles SVG), **persistent par `id`** (même id = la cellule
vit et se déplace en fluide ; absorbée = elle glisse dans l'hôte et se résorbe), **flottent**
(bruit de Perlin). Scène **plein écran immersive**, fond sombre pur (aucune image).

Natures (couleur) : **tech** (bleu) · **human** (rose) · **event** (ambre, transient) ·
**agent** (violet) · **hot** (rouge). Aucune variable « valeur » explicite → exprimée par
**pulsation** (`tempo` monte vers la fin : les cellules respirent plus vite).

En bas : **une seule frise fusionnée métro+cardiogramme** (canvas 2D) qui se **construit au
clic**, dégradé bleu→rouge, **de plus en plus turbulente** vers la fin, stations (jalons
datés) posées sur les **vrais jalons**, flèche « demain ». Chapitres = **voile sombre +
titre en fondu** (façon « il était une fois »).

Beats de la scène `cellular` (dans `deck.json`) — mutations cumulatives :

```json
{ "chapter": "…",              // déclenche le voile + titre en fondu
  "caption": "…",              // légende bas-gauche, en fondu (HTML: <span class="hl…">)
  "tempo": 1.5,                // nervosité globale (0.9 début → 3.0 fin)
  "add":    [{ "id":"de", "kind":"human", "label":"Data Eng", "x":0.3, "y":0.4, "r":0.1 }],
  "morph":  [{ "id":"metabase", "kind":"tech", "label":"BI-as-code" }],
  "absorb": [{ "id":"de", "into":"me" }],   // fusion visible : glisse dans l'hôte + se résorbe
  "remove": ["ev-lean"],                     // résorption seule (event transient)
  "station": { "date": "2024" } }            // pose un jalon daté sur la frise
```

`x`/`y` sont relatifs (0→1), `r` = fraction du plus petit côté. La fable finit par un
`morph` de la cellule survivante en « **1** » (r agrandi) → « bientôt un » se lit d'un coup.

Aperçus dans `preview/` : `fable-team.png` (équipe constituée), `fable-agents.png`
(dissolution / agents), `fable-convergence.png` (tout se replie sur « 1 »).
