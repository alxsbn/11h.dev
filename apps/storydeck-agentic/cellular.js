/* ============================================================
   Cellular — moteur métaball WebGL (p5.js) piloté par BEATS.
   Dérivé du prototype cellular-deck : shader métaball (les cellules
   fusionnent organiquement, couleurs qui se fondent aux jonctions),
   persistance par `id` (même id = la cellule vit et se déplace en
   fluide ; id qui disparaît = résorption), flottement Perlin.

   Différence avec le prototype : ici la population est CUMULATIVE et
   pilotée beat par beat (add / absorb / morph / event / pulse), avec
   une frise « métro+cardiogramme fusionnée » en bas qui se construit
   au clic et devient turbulente, + un voile de chapitre en fondu.

   API : new Cellular(container, beats) → { enter, exit, advance,
   retreat, atEnd }. Autonome (crée son canvas p5 en mode instance).
   ============================================================ */

// ============================================================
// PALETTE PAR USAGE — reprise de la légende du diagramme d'archi Jolimoi.
// Chaque cellule porte une couleur = sa catégorie d'usage → on lit les ÎLOTS.
// Les cellules sont rendues en DISQUES NETS à contour (jamais confondues),
// posées sur un léger halo métaball coloré qui regroupe visuellement.
// ============================================================
const USAGE = {
  source:       [96, 165, 210],  // bleu clair — data source (MySQL, RDS)
  ingestion:    [116, 198, 157],  // vert — ingestion / reverse ETL (DMS, Airbyte, Fivetran, Census, Autoloader)
  transfo:      [232, 116, 140],  // rose — transformation / modélisation (dbt, ML, metric tree)
  serving:      [168, 130, 220],  // violet — serving (Metabase, Notion)
  storage:      [224, 190, 90],   // jaune — storage (Databricks lakehouse)
  orchestration:[80, 190, 200],   // turquoise — orchestration (Airflow, k8s)
  gouvernance:  [140, 150, 165],  // gris — gouvernance (data catalog, semantic layer, ontologie)
  monitoring:   [230, 150, 70],   // orange — monitoring (New Relic, Elementary)
  agent:        [150, 120, 220],  // lavande — agents / IA (Claude, Genie, MCP, swarm, AutoML)
  // natures non-tech
  people_data:  [242, 116, 140],  // corail — people data team
  people_prod:  [95, 175, 235],   // bleu — people product
  people_mkt:   [245, 175, 90],   // ambre — people marketing
  event:        [225, 90, 110],   // rouge corail — événement
  hot:          [225, 70, 100],   // rouge — prise de conscience
  neutral:      [90, 96, 104],    // gris foncé — S.I.M.P.L.E, audit BoA (événements structurants)
  me:           [232, 90, 120],   // corail soutenu — moi (le fil rouge)
};
// rétro-compat : anciens noms de nature → usage par défaut
const CP = {
  tech: USAGE.storage, human: USAGE.people_data, event: USAGE.event,
  agent: USAGE.agent, hot: USAGE.hot,
};
// forme par nature : tech/agent = carré arrondi, people = rond, event = losange
const SHAPE = { tech: "square", human: "circle", event: "diamond", agent: "square", hot: "diamond" };

export class Cellular {
  /* « un clic = une apparition » — éclate chaque beat source en sous-beats atomiques :
       1) si `chapter` → un sous-beat qui n'affiche QUE le carton de chapitre (voile + titre),
          sans muter la population (le récit s'annonce avant que ça bouge) ;
       2) puis UN sous-beat par cellule de `add` → chaque bulle apparaît sur son propre clic.
          Le PREMIER sous-beat d'apparition porte la caption + tous les autres effets du beat
          (morph / size / move / absorb / remove / station / tempo). Les suivants n'ajoutent
          qu'une bulle chacun (caption inchangée).
       3) un beat sans `add` (juste caption/morph/absorb/…) reste un seul sous-beat. */
  static expandBeats(beats) {
    const out = [];
    for (const b of beats) {
      const adds = Array.isArray(b.add) ? b.add : [];
      // 1) carton de chapitre SEUL (juste le titre en fondu ; la caption vient avec le contenu)
      if (b.chapter) out.push({ chapter: b.chapter, tempo: b.tempo });
      if (adds.length === 0) {
        // pas d'apparition : le beat (moins le chapter déjà sorti) en un sous-beat
        const { chapter, ...rest } = b;
        if (rest.caption || rest.morph || rest.size || rest.move || rest.absorb || rest.remove || rest.station || rest.tempo)
          out.push(rest);
        continue;
      }
      // 2) un sous-beat par bulle ; le 1er porte la caption + tous les effets du beat
      adds.forEach((cell, k) => {
        if (k === 0) {
          const { chapter, add, ...effects } = b;   // garde caption, morph, size, move, absorb, remove, station, tempo
          out.push({ ...effects, add: [cell] });
        } else {
          out.push({ add: [cell] });   // apparition seule, caption inchangée
        }
      });
    }
    return out;
  }

  constructor(container, beats) {
    this.container = container;
    // « un clic = une apparition » : on éclate chaque beat en sous-beats atomiques.
    this.beats = Cellular.expandBeats(beats);
    this.beatIdx = -1;
    this.cells = [];
    this.uid = 0;
    this.tempo = 1;              // nervosité globale (monte vers la fin)
    this.p = null;
    this.MAX = 40;
    this.stations = [];         // {label, date, turb} accumulées
    this._built = false;
    this._buildDom();
  }

  _buildDom() {
    const c = this.container;
    c.classList.add("cellular");
    c.innerHTML = `
      <div class="cellular__canvas"></div>
      <canvas class="cellular__links"></canvas>
      <div class="cellular__vignette"></div>
      <div class="cellular__labels"></div>
      <div class="cellular__chapter"><span></span></div>
      <div class="cellular__veil"></div>
      <div class="cellular__caption"></div>
      <div class="cellular__date"></div>
      <div class="cellular__frieze"><canvas></canvas></div>`;
    this.canvasHost = c.querySelector(".cellular__canvas");
    this.dateEl     = c.querySelector(".cellular__date");
    this.linksCv    = c.querySelector(".cellular__links");
    this.labelsEl   = c.querySelector(".cellular__labels");
    this.chapterEl  = c.querySelector(".cellular__chapter");
    this.chapterTxt = c.querySelector(".cellular__chapter span");
    this.veilEl     = c.querySelector(".cellular__veil");
    this.captionEl  = c.querySelector(".cellular__caption");
    this.friezeCv   = c.querySelector(".cellular__frieze canvas");
  }

  /* ---------- shader métaball (repris du prototype) ---------- */
  _shaders() {
    const vert = `
precision highp float;
attribute vec3 aPosition;
void main(){ vec4 pos = vec4(aPosition,1.0); pos.xy = pos.xy*2.0-1.0; gl_Position = pos; }`;
    const frag = `
precision highp float; precision highp int;
#define MAX 40
uniform vec2 u_resolution; uniform int u_count;
uniform vec3 u_blobs[MAX]; uniform vec3 u_colors[MAX];
uniform vec3 u_bg; uniform float u_threshold; uniform float u_softness; uniform float u_glow;
void main(){
  vec2 p = gl_FragCoord.xy; float field=0.0; vec3 col=vec3(0.0); float wsum=0.0;
  for(int i=0;i<MAX;i++){
    if(i>=u_count) break;
    float r=u_blobs[i].z; if(r<=0.01) continue;
    vec2 d=p-u_blobs[i].xy; float dist2=dot(d,d)+1.0;
    float infl=(r*r)/dist2; field+=infl; col+=u_colors[i]*infl; wsum+=infl;
  }
  vec3 blobColor = wsum>0.0 ? col/wsum : vec3(0.0);
  float t=u_threshold;
  float surface = smoothstep(t-u_softness, t+u_softness, field);
  float halo    = smoothstep(t*0.25, t, field)*u_glow;
  vec3 outColor = u_bg;
  outColor += blobColor*halo*0.6;
  outColor  = mix(outColor, blobColor, surface);
  outColor += blobColor*surface*0.15;
  gl_FragColor = vec4(outColor,1.0);
}`;
    return { vert, frag };
  }

  /* ---------- cycle de vie p5 (mode instance) ---------- */
  enter() {
    if (this.p) this.exit();
    this.beatIdx = -1; this.cells = []; this.uid = 0; this.tempo = 1;
    this.stations = []; this.labelEls = {}; this.friezeProg = 0; this._friezeX = undefined; this.links = [];
    this._lastDate = undefined; if (this.dateEl) this.dateEl.textContent = "";
    const self = this;
    // Le métaball ne sert plus que de HALO de fond léger (regroupe les îlots par couleur)
    // — les cellules elles-mêmes sont dessinées en disques nets à contour par-dessus.
    // Réglages inspirés du prototype CellularDeck (seuil haut, douceur, glow modéré).
    // glow métaball réduit : le halo diffus par-forme (shadowBlur, canvas) prend le relais
    // → un carré a un halo carré, un rond un halo rond, plus de halo rond systématique.
    // glow RELEVÉ + threshold ABAISSÉ → le champ métaball redéborde entre voisines :
    // les halos colorés fusionnent → aspect « soupe cellulaire » organique et flou.
    const CFG = { background:[246,239,228], threshold:1.0, softness:0.55, glow:0.5, speed:1.0, wander:0.55 };
    this.CFG = CFG;

    this.p = new p5((sk) => {
      let theShader;
      sk.setup = () => {
        self.p = sk;                 // dispo dès le setup (avant le retour de new p5)
        sk.pixelDensity(1);
        const w = self.canvasHost.clientWidth || 900, h = self.canvasHost.clientHeight || 500;
        const cv = sk.createCanvas(w, h, sk.WEBGL);
        cv.parent(self.canvasHost);
        sk.noStroke();
        const { vert, frag } = self._shaders();
        theShader = sk.createShader(vert, frag);
        self._applyBeat(0, true);
        self.beatIdx = 0;
      };
      sk.draw = () => {
        const t = sk.millis()/1000 * CFG.speed * (0.7 + self.tempo*0.35);
        self._updateCells(sk, t);
        const pos = new Array(self.MAX*3).fill(0);
        const cols = new Array(self.MAX*3).fill(0);
        let n = 0;
        for (const c of self.cells) {
          if (n >= self.MAX) break;
          pos[n*3]=c.x; pos[n*3+1]=sk.height-c.y; pos[n*3+2]=c.r;
          cols[n*3]=c.color[0]/255; cols[n*3+1]=c.color[1]/255; cols[n*3+2]=c.color[2]/255;
          n++;
        }
        sk.shader(theShader);
        theShader.setUniform('u_resolution', [sk.width, sk.height]);
        theShader.setUniform('u_count', n);
        theShader.setUniform('u_blobs', pos);
        theShader.setUniform('u_colors', cols);
        theShader.setUniform('u_bg', CFG.background.map(v=>v/255));
        theShader.setUniform('u_threshold', CFG.threshold);
        theShader.setUniform('u_softness', CFG.softness);
        theShader.setUniform('u_glow', CFG.glow);
        sk.rect(0,0,sk.width,sk.height);
        self._drawDisks(sk);
        self._syncLabels(sk);
        self._drawFrieze();
      };
      sk.windowResized = () => {
        const w = self.canvasHost.clientWidth || 900, h = self.canvasHost.clientHeight || 500;
        sk.resizeCanvas(w, h);
      };
    });
  }

  exit() {
    if (this.p) { this.p.remove(); this.p = null; }
    this.labelsEl.innerHTML = "";
    this.labelEls = {};
  }

  _minDim(sk) { return Math.min(sk.width, sk.height); }

  _updateCells(sk, t) {
    const CFG = this.CFG;
    // 1) déplacement vers la cible + flottement + croissance
    for (let i = this.cells.length-1; i>=0; i--) {
      const c = this.cells[i];
      const wx = (sk.noise(c.sx, t*0.15)*2-1) * CFG.wander * sk.width * 0.035;
      const wy = (sk.noise(c.sy, t*0.15)*2-1) * CFG.wander * sk.height * 0.035;
      // la soupe vit dans les ~72% supérieurs : on réserve la bande basse pour la caption+frise
      const tyClamped = 0.06 + Math.min(Math.max(c.ty, 0), 1) * 0.66;
      const tx = c.tx*sk.width + wx, ty = tyClamped*sk.height + wy;
      c.x += (tx - c.x)*0.035; c.y += (ty - c.y)*0.035;   // attraction douce vers l'ancrage d'îlot
      const tr = c.dead ? 0 : c.tr * this._minDim(sk);
      c.r += (tr - c.r)*0.08;
      for (let k=0;k<3;k++) c.color[k] += (c.tcolor[k]-c.color[k])*0.06;
      if (c.dead && c.r < 0.6) this.cells.splice(i,1);
    }
    // 2) RÉPULSION (collision) : deux bulles ne se superposent jamais → on les lit toujours.
    //    On garde une marge entre les bords ; les positions cibles ne sont qu'un ancrage d'îlot.
    const n = this.cells.length;
    for (let iter=0; iter<3; iter++) {   // quelques passes pour stabiliser
      for (let i=0;i<n;i++) {
        const a = this.cells[i]; if (a.dead) continue;
        for (let j=i+1;j<n;j++) {
          const b = this.cells[j]; if (b.dead) continue;
          const dx = b.x-a.x, dy = b.y-a.y;
          let dist = Math.hypot(dx,dy) || 0.01;
          const minDist = (a.r + b.r) + 14;   // marge entre bords
          if (dist < minDist) {
            const push = (minDist - dist) * 0.5;
            const ux = dx/dist, uy = dy/dist;
            // les grosses bulles bougent moins (masse ~ rayon)
            const wa = b.r/(a.r+b.r), wb = a.r/(a.r+b.r);
            a.x -= ux*push*wa; a.y -= uy*push*wa;
            b.x += ux*push*wb; b.y += uy*push*wb;
          }
        }
      }
    }
  }

  /* formes nettes : chaque cellule = sa FORME (carré tech/agent · rond people · losange event)
     + contour FIN de sa couleur d'usage. Rendu par-dessus le halo métaball → jamais confondues. */
  _shapePath(ctx, kind, x, y, r) {
    const shape = SHAPE[kind] || "circle";
    ctx.beginPath();
    if (shape === "circle") {
      ctx.arc(x, y, r, 0, Math.PI*2);
    } else if (shape === "diamond") {
      ctx.moveTo(x, y-r); ctx.lineTo(x+r, y); ctx.lineTo(x, y+r); ctx.lineTo(x-r, y); ctx.closePath();
    } else { // square arrondi
      const rad = r*0.28, s = r*0.92;
      const l=x-s, t=y-s, rr=x+s, bb=y+s;
      ctx.moveTo(l+rad, t);
      ctx.arcTo(rr, t, rr, bb, rad); ctx.arcTo(rr, bb, l, bb, rad);
      ctx.arcTo(l, bb, l, t, rad); ctx.arcTo(l, t, rr, t, rad); ctx.closePath();
    }
  }
  _drawDisks(sk) {
    const cv = this.linksCv;
    const w = sk.width, h = sk.height;
    if (cv.width !== w) cv.width = w; if (cv.height !== h) cv.height = h;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0,0,w,h);
    const sorted = this.cells.slice().sort((a,b)=>b.r-a.r);

    // PASSE 1 — HALO DIFFUS de la MÊME FORME que la bulle (carré diffus pour un carré,
    // rond diffus pour un rond). Réalisé via shadowBlur du canvas → le flou épouse la forme.
    for (const c of sorted) {
      if (c.r < 1) continue;
      const [r,g,b] = c.color;
      const op = Math.max(0, Math.min(1, c.r/(0.04*this._minDim(sk))));
      // HALO DIFFUS de la MÊME FORME (via shadowBlur) — remplace le halo métaball rond.
      ctx.save();
      // couche 1 : TRÈS large + douce → nappe colorée qui déborde et fusionne (la « soupe »)
      ctx.shadowColor = `rgba(${r|0},${g|0},${b|0},${0.8*op})`;
      ctx.shadowBlur = Math.max(46, c.r*1.8);
      this._shapePath(ctx, c.kind, c.x, c.y, c.r*0.78);
      ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},0.06)`;
      ctx.fill();
      // couche 2 : plus serrée, plus intense
      ctx.shadowBlur = Math.max(22, c.r*0.9);
      ctx.shadowColor = `rgba(${r|0},${g|0},${b|0},${0.85*op})`;
      this._shapePath(ctx, c.kind, c.x, c.y, c.r*0.86);
      ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},0.08)`;
      ctx.fill();
      ctx.restore();
    }

    // PASSE 2 — CORPS plein de chaque forme (sans contour) + reflet interne
    for (const c of sorted) {
      if (c.r < 1) continue;
      const [r,g,b] = c.color;
      const op = Math.max(0, Math.min(1, c.r/(0.04*this._minDim(sk))));
      this._shapePath(ctx, c.kind, c.x, c.y, c.r);
      ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${0.85*op})`;
      ctx.fill();
      // reflet interne = dégradé LINÉAIRE haut→bas, CLIPPÉ à la forme → épouse le carré/rond/losange
      // (plus de disque rond visible à l'intérieur d'un carré).
      ctx.save();
      this._shapePath(ctx, c.kind, c.x, c.y, c.r);
      ctx.clip();
      const grad = ctx.createLinearGradient(c.x, c.y-c.r, c.x, c.y+c.r);
      grad.addColorStop(0,   `rgba(255,255,255,${0.28*op})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${0.06*op})`);
      grad.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(c.x-c.r, c.y-c.r, c.r*2, c.r*2);
      ctx.restore();
    }
  }

  _syncLabels(sk) {
    const cont = this.labelsEl, seen = {};
    for (const c of this.cells) {
      // rien si pas de contenu OU si la cellule meurt (absorbée/résorbée)
      const hasContent = c.logo || c.label;
      if (!hasContent || c.dead) { if (this.labelEls[c.id]) { this.labelEls[c.id].remove(); delete this.labelEls[c.id]; } continue; }
      seen[c.id]=1;
      let el = this.labelEls[c.id];
      if (!el) { el = document.createElement("div"); el.className="cl__lbl"; cont.appendChild(el); this.labelEls[c.id]=el; }
      // logo (tech) → <img> au centre + NOM en petit SOUS le carré ;
      // sinon texte centré (people / events / bulles-concept).
      const key = (c.logo||"") + "|" + (c.label||"");
      if (c.logo) {
        if (el.dataset.key !== key) {
          el.dataset.key = key;
          const src = (typeof LOGO_MAP !== "undefined" && LOGO_MAP[c.logo]) || `assets/stack/${c.logo}`;
          el.innerHTML = `<img class="cl__logo" src="${src}" alt="${c.label||''}" />`
            + (c.label ? `<span class="cl__name">${c.label}</span>` : "");
        }
        const img = el.querySelector(".cl__logo");
        if (img) img.style.width = Math.max(22, c.r*1.0)+"px";
        const nm = el.querySelector(".cl__name");
        if (nm) nm.style.top = (c.r + 6) + "px";   // nom juste sous le carré
      } else {
        if (el.dataset.key !== key) { el.dataset.key = key; el.innerHTML = `<span class="cl__txt">${c.label}</span>`; }
        const tx = el.querySelector(".cl__txt");
        if (tx) tx.style.fontSize = Math.max(11, c.r*0.28)+"px";
      }
      el.style.left = c.x+"px"; el.style.top = c.y+"px";
      el.style.opacity = Math.max(0, Math.min(1, c.r/(0.06*this._minDim(sk))));
    }
    for (const id in this.labelEls) if (!seen[id]) { this.labelEls[id].remove(); delete this.labelEls[id]; }
  }

  /* ---------- frise « métro + cardiogramme » fusionnée ----------
     Une seule ligne turbulente en bas. Elle se construit au fil des
     beats (jusqu'au dernier jalon atteint), la turbulence croît vers
     la fin, les stations (jalons datés) sont des points sur la ligne. */
  _drawFrieze() {
    const cv = this.friezeCv;
    const w = cv.clientWidth || 900, h = cv.clientHeight || 60;
    if (cv.width !== w) cv.width = w; if (cv.height !== h) cv.height = h;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0,0,w,h);
    const beats = this.beats;
    // progression FLUIDE : la cible est le beat courant, mais on l'atteint en glissant
    // (le flux avance/recule doucement au clic, jamais de saut sec).
    const target = beats.length ? (this.beatIdx+1)/beats.length : 0;
    // AXE TEMPOREL ISO : chaque année occupe la MÊME largeur. La portion révélée va
    // jusqu'à la date du beat courant (les stations déjà atteintes), pas jusqu'à un
    // % de beats. Ainsi l'accumulation de points par année devient visible.
    const YMIN = 2020, YMAX = 2026.5;                 // bornes de l'axe (juin 2026 = dernier)
    const axisW = w - 46;
    const yearToX = (yr) => ((yr - YMIN) / (YMAX - YMIN)) * axisW;
    // date courante révélée = année max parmi les stations jusqu'au beat courant
    let curYear = YMIN;
    for (let k = 0; k <= this.beatIdx && k < this.beats.length; k++) {
      const st = this.beats[k]?.station;
      if (st && st.date) { const y = Cellular.dateToYear(st.date); if (y != null) curYear = Math.max(curYear, y); }
    }
    const targetX = yearToX(curYear);
    if (this._friezeX === undefined) this._friezeX = targetX;
    this._friezeX += (targetX - this._friezeX) * 0.12;   // easing exponentiel par frame
    if (Math.abs(targetX - this._friezeX) < 0.5) this._friezeX = targetX;
    const mid = h*0.55, xmax = this._friezeX;
    const now = performance.now()/1000;
    const N = 300;
    ctx.beginPath();
    for (let i=0;i<=N;i++) {
      const ph = i/N;                       // 0..1 sur la portion révélée
      const px = ph*xmax;
      // turbulence croissante : amplitude + fréquence montent avec ph ET avec tempo
      const growth = 0.15 + ph*ph*1.0;
      const amp = (2 + growth*13) ;
      const freq = 6 + ph*ph*34;
      const wobble = Math.sin(ph*Math.PI*freq + now*(1.5+this.tempo)) * amp * (0.4+ph*0.9);
      // spikes cardiaques épars, plus serrés vers la fin
      const beatEvery = Math.max(4, Math.round(28*(1-ph*0.8)));
      const spike = (i % beatEvery === 0) ? -amp*1.4*(0.5+ph) : 0;
      const y = mid + wobble*0.5 + spike;
      if (i===0) ctx.moveTo(px,y); else ctx.lineTo(px,y);
    }
    // dégradé bleu ciel → rose le long de la ligne (fusion métro+cardio), thème conte
    const grad = ctx.createLinearGradient(0,0,xmax,0);
    grad.addColorStop(0, "#5b9dd9");
    grad.addColorStop(0.55, "#b07bb8");
    grad.addColorStop(1, "#d64f7c");
    ctx.strokeStyle = grad; ctx.lineWidth = 3.4; ctx.lineJoin="round"; ctx.stroke();
    // GRILLE ANNÉES ISO : un label par année pleine, espacé RÉGULIÈREMENT sur tout l'axe
    // (2020, 2021, … 2026 à intervalles identiques). Toujours affiché (repère fixe).
    ctx.textAlign = "center";
    ctx.font = "600 12px 'Playfair Display',Georgia,serif";
    for (let yr = 2020; yr <= 2026; yr++) {
      const yx = yearToX(yr);
      ctx.fillStyle = "rgba(107,93,79,.6)";
      ctx.fillText(String(yr), yx, h-5);
      // fin tick vertical léger sous la ligne
      ctx.strokeStyle = "rgba(107,93,79,.18)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(yx, mid+10); ctx.lineTo(yx, h-16); ctx.stroke();
    }
    // stations (jalons datés) : positionnées à leur VRAIE date sur l'axe ISO.
    let curDate = null;
    this.stations.forEach((st) => {
      if (st.year == null) return;
      const sx = yearToX(st.year);
      if (sx > xmax+2) return;                 // pas encore révélée
      curDate = st.date || curDate;
      if (st.mark) {
        const gold = st.mark === "gold";
        ctx.beginPath(); ctx.arc(sx, mid, 7, 0, Math.PI*2);
        if (gold) { ctx.fillStyle = "#e0a020"; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = "#a86e10"; ctx.stroke(); }
        else { ctx.fillStyle = "#1c1c1c"; ctx.fill(); }
      } else {
        ctx.beginPath(); ctx.arc(sx, mid, 5, 0, Math.PI*2);
        ctx.fillStyle = "#f6efe4"; ctx.fill();
        ctx.lineWidth = 2.2; ctx.strokeStyle = "#5b9dd9"; ctx.stroke();
      }
    });
    // flèche « demain » au bout de la portion révélée
    ctx.fillStyle = "#d64f7c"; ctx.font = "700 18px -apple-system,sans-serif";
    ctx.textAlign = "left"; ctx.fillText("▸", Math.min(xmax+8, w-40), mid+4);
    // DATE COURANTE en gros, en bas à DROITE — via un élément HTML (au-dessus de la frise)
    if (this.dateEl && curDate !== this._lastDate) {
      this.dateEl.textContent = curDate || "";
      this._lastDate = curDate;
    }
  }

  /* ---------- chapitre : voile + titre en fondu ---------- */
  _showChapter(txt) {
    this.chapterTxt.textContent = txt;
    this.chapterEl.classList.add("on");
    this.veilEl.classList.add("on");
    clearTimeout(this._chapT);
    this._chapT = setTimeout(() => {
      this.chapterEl.classList.remove("on");
      this.veilEl.classList.remove("on");
    }, 1900);
  }

  /* ---------- application d'un beat (mutation cumulative) ---------- */
  _applyBeat(i, instant=false) {
    const b = this.beats[i]; if (!b) return;
    if (b.chapter) this._showChapter(b.chapter);
    // caption en fondu
    this.captionEl.classList.add("off");
    setTimeout(() => {
      this.captionEl.innerHTML = b.caption || "";
      this.captionEl.classList.remove("off");
    }, b.chapter ? 700 : 200);
    if (b.tempo) this.tempo = b.tempo;

    // add : nouvelles cellules (position relative, r relatif)
    (b.add || []).forEach((c) => {
      const kind = c.kind || "tech";
      // couleur : par USAGE si fourni (ingestion, serving, agent…), sinon par nature
      const col = (c.usage && USAGE[c.usage] ? USAGE[c.usage] : (CP[kind] || CP.tech)).slice();
      this.cells.push({
        id: c.id || `n${this.uid++}`, kind, usage: c.usage || null,
        label: c.label || "", logo: c.logo || null,
        x: (c.x ?? 0.5) * (this.canvasHost.clientWidth||900),
        y: (c.y ?? 0.5) * (this.canvasHost.clientHeight||500),
        r: instant ? (c.r || 0.09)*this._minDim(this.p) : 0,
        tx: c.x ?? (0.3 + Math.random()*0.4),
        ty: c.y ?? (0.3 + Math.random()*0.4),
        tr: c.r || (kind==="event" ? 0.06 : 0.09),
        color: col.slice(), tcolor: col,
        sx: Math.random()*1000, sy: Math.random()*1000, born: this.uid
      });
    });
    // morph : change nature/label (fondu de couleur via tcolor)
    (b.morph || []).forEach((m) => {
      const nd = this.cells.find((n) => n.id === m.id);
      if (nd) {
        if (m.kind) { nd.kind = m.kind; nd.tcolor = (CP[m.kind]||CP.tech).slice(); }
        if (m.label !== undefined) nd.label = m.label;
        if (m.r) nd.tr = m.r;
      }
    });
    // link : crée des arêtes entre bulles (archi réelle). ["mysql","dms"] ou [["a","b"],...]
    (b.link || []).forEach((pair) => {
      const [a2, b2] = pair;
      if (!this.links.some((l) => (l.a===a2&&l.b===b2)||(l.a===b2&&l.b===a2)))
        this.links.push({ a: a2, b: b2 });
    });
    // unlink : retire une arête
    (b.unlink || []).forEach((pair) => {
      const [a2, b2] = pair;
      this.links = this.links.filter((l) => !((l.a===a2&&l.b===b2)||(l.a===b2&&l.b===a2)));
    });
    // size : change le rayon cible d'une cellule (taille = valeur/charge portée)
    (b.size || []).forEach((sz) => {
      const nd = this.cells.find((n) => n.id === sz.id);
      if (nd && sz.r) nd.tr = sz.r;
    });
    // move : repositionne une cellule (x,y relatifs)
    (b.move || []).forEach((mv) => {
      const nd = this.cells.find((n) => n.id === mv.id);
      if (nd) { if (mv.x != null) nd.tx = mv.x; if (mv.y != null) nd.ty = mv.y; }
    });
    // remove : la cellule se résorbe seule (event transient : un choc qui passe)
    (b.remove || []).forEach((id) => {
      const nd = this.cells.find((n) => n.id === id);
      if (nd) nd.dead = true;
      this.links = this.links.filter((l) => l.a!==id && l.b!==id);
    });
    // absorb : la cellule partie fond dans l'hôte (métaball → fusion visible)
    (b.absorb || []).forEach((ab) => {
      const gone = this.cells.find((n) => n.id === ab.id);
      const host = this.cells.find((n) => n.id === ab.into);
      if (gone && host) {
        gone.tx = host.tx; gone.ty = host.ty;   // glisse vers l'hôte → les métaballs fusionnent
        gone.dead = true;                         // puis se résorbe
      } else if (gone) { gone.dead = true; }
      this.links = this.links.filter((l) => l.a!==ab.id && l.b!==ab.id);
    });

    // station (jalon frise) — positionnée à sa VRAIE date sur un axe temporel ISO
    // (chaque année = même largeur ; l'accumulation de points devient visible).
    if (b.station) {
      this.stations.push({ year: Cellular.dateToYear(b.station.date), date: b.station.date || null, mark: b.station.mark || false });
    }
  }

  /* parse une date FR variée en année décimale : "déc. 2022"→2022.96, "mi-2024"→2024.5,
     "~2020"/"2021"→année pleine, "Q2 2024"→2024.375. NULL si pas d'année trouvée. */
  static dateToYear(str) {
    const s = String(str || "").toLowerCase();
    const ym = s.match(/(20\d{2})/); if (!ym) return null;
    const year = +ym[1];
    const MONTHS = { janv:0, "févr":1, fevr:1, mars:2, avr:3, mai:4, juin:5,
                     juil:6, "août":7, aout:7, sept:8, oct:9, nov:10, "déc":11, dec:11 };
    for (const k in MONTHS) { if (s.includes(k)) return year + (MONTHS[k] + 0.5) / 12; }
    if (s.includes("mi-") || s.startsWith("mi ")) return year + 0.5;
    const q = s.match(/q([1-4])/); if (q) return year + (+q[1] - 0.5) / 4;
    if (s.includes("fin")) return year + 0.92;
    if (s.includes("début") || s.includes("debut")) return year + 0.04;
    return year + 0.5;   // année seule → milieu d'année
  }

  advance() {
    if (this.beatIdx < this.beats.length-1) { this.beatIdx++; this._applyBeat(this.beatIdx); return true; }
    return false;
  }
  retreat() {
    if (this.beatIdx > 0) {
      const target = this.beatIdx-1;
      // rejoue depuis 0 (beats cumulatifs)
      this.cells = []; this.uid = 0; this.tempo = 1; this.stations = []; this.links = [];
      this.labelsEl.innerHTML = ""; this.labelEls = {};
      for (let k=0;k<=target;k++) this._applyBeat(k, true);
      this.beatIdx = target;
      return true;
    }
    return false;
  }
  get atEnd() { return this.beatIdx >= this.beats.length-1; }
}
