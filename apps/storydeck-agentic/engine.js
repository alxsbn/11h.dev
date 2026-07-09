/* ============================================================
   StoryDeck — moteur générique
   Charge un deck.json et le rend. Trois couches : registre de scènes
   (renderers) · moteur de progression unifié (clic/flèche/molette →
   même index, avec beats internes) · chrome UI.
   ============================================================ */

import { Cellular } from "./cellular.js";

const fmt = {
  integer: (v) => Math.round(v).toLocaleString("fr-FR"),
  percent: (v) => v.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " %",
  raw: (v) => String(Math.round(v))
};

/* ---------- 1) REGISTRE DE SCÈNES ---------- */
const renderers = {
  title(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--title");
    // sans image de fond → titre CENTRÉ plein écran (le décalage à droite ne sert que
    // pour l'enseigne néon de la 1re slide). Évite que « continued » soit coupé.
    if (!s.media) el.classList.add("scene--title-center");
    el.querySelector(".scene__content").innerHTML = `
      <h1 class="reveal">${s.title}</h1>
      ${s.subtitle ? `<p class="lead reveal">${s.subtitle}</p>` : ""}`;
    return { el };
  },

  // Liste qui s'empile (puces ▸ par défaut ; noBullet:true = sans puce)
  // image:"..." → capture à droite (2 colonnes). decision:true → bloc « Build vs Buy » à droite,
  //   au clic « Build » est barré + patch « Agentic ? » en travers.
  list(s) {
    const el = sceneEl(s.media, s.bgVideo);
    if (s.heading) el.classList.add("scene--titled");
    if (s.image) el.classList.add("scene--list-img");
    if (s.decision) el.classList.add("scene--list-img", "scene--decision");
    const cls = "stacklist" + (s.noBullet ? " stacklist--plain" : "");
    const listBlock = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <ul class="${cls}">${s.items.map((it) => `<li>${it}</li>`).join("")}</ul>
      ${s.caption ? `<p class="lead reveal">${s.caption}</p>` : ""}`;
    const decisionBlock = `
      <div class="decis reveal">
        <span class="decis__opt decis__build">Build</span>
        <span class="decis__vs">vs</span>
        <span class="decis__opt">Buy</span>
        <span class="decis__patch">Agentic !</span>
      </div>`;
    // bloc "2 briques Lego" : base + brique qui tombe de très haut et s'emboîte
    const bricksBlock = `
      <div class="bricks reveal">
        <img class="bricks__top" src="assets/img/lego-blue-brick.png" alt="" />
        <img class="bricks__base" src="assets/img/lego-brick.png" alt="" />
      </div>`;
    // bloc compare VERTICAL (200 au-dessus, flèche ↓, 600 en dessous) — dans la colonne droite
    const cmpBlock = s.compare ? `
      <div class="list-cmp reveal">
        ${s.compare.title ? `<div class="list-cmp__title">${s.compare.title}</div>` : ""}
        <div class="list-cmp__col">
          <div class="list-cmp__side"><div class="list-cmp__val" data-target="${s.compare.left.value}">0</div><div class="list-cmp__lbl">${s.compare.left.label}</div></div>
          <div class="list-cmp__arrow">↓</div>
          <div class="list-cmp__side"><div class="list-cmp__val list-cmp__val--hot" data-target="${s.compare.right.value}">0</div><div class="list-cmp__lbl">${s.compare.right.label}</div></div>
        </div>
      </div>` : "";
    const rightBlock = s.decision ? decisionBlock
      : s.bricks ? bricksBlock
      : s.compare ? cmpBlock
      : (s.image ? `<img class="list-split__img reveal${s.imageBare ? " list-split__img--bare" : ""}${s.imageFloat ? " list-split__img--float" : ""}" src="${s.image}" alt="" />` : "");
    const bodyHtml = rightBlock
      ? `<div class="list-split"><div class="list-split__text">${listBlock}</div>${rightBlock}</div>`
      : listBlock;
    el.querySelector(".scene__content").innerHTML = bodyHtml;
    if (s.compare) el.classList.add("scene--list-cmp");
    const lis = [...el.querySelectorAll(".stacklist li")];
    const cmpEl = el.querySelector(".list-cmp");
    let shown = 0, struck = false, cmpDone = false;
    return {
      el,
      onEnter() {
        lis.forEach((li) => li.classList.remove("on"));
        shown = 0;                                // aucune puce à l'entrée — tout au clic
        struck = false; cmpDone = false;
        el.querySelector(".decis")?.classList.remove("is-struck");
        cmpEl?.classList.remove("on");            // compare caché au départ
        const top = el.querySelector(".bricks__top");
        if (top) { top.classList.remove("on"); setTimeout(() => top.classList.add("on"), 500); }
      },
      onExit()  {
        lis.forEach((li) => li.classList.remove("on"));
        shown = 0; struck = false; cmpDone = false;
        el.querySelector(".decis")?.classList.remove("is-struck");
        cmpEl?.classList.remove("on");
      },
      advance() {
        // 1) révèle les puces une par une au clic
        if (shown < lis.length) { lis[shown].classList.add("on"); shown++; return true; }
        // 2) beat décision (Build barré + patch Agentic)
        if (s.decision && !struck) { struck = true; el.querySelector(".decis")?.classList.add("is-struck"); return true; }
        // 3) EN DERNIER : révèle le compare + anime les compteurs
        if (s.compare && !cmpDone) {
          cmpDone = true; cmpEl?.classList.add("on");
          el.querySelectorAll(".list-cmp__val").forEach((node) => {
            const it = d3.interpolateNumber(0, +node.dataset.target);
            d3.select(node).transition().duration(1100).ease(d3.easeCubicOut)
              .tween("c", () => (t) => { node.textContent = fmt.integer(it(t)); });
          });
          return true;
        }
        return false;
      }
    };
  },

  // Versus — N logos alignés avec « VS » entre eux, apparaissent l'un après l'autre.
  // `items` = [{ img, name }]. decision:true → bloc « Build vs Buy » sous les logos,
  //   au dernier clic « Build » barré + patch « Agentic ! » par-dessus Build.
  versus(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--versus");
    // strikeItems: ["Airbyte","dlt Hub"] → une croix rouge se superpose sur ces items au clic
    const strike = new Set(s.strikeItems || []);
    const cells = s.items.map((it) =>
      `<figure class="vs__item"><img src="${it.img}" alt="${it.name}" /><figcaption>${it.name}</figcaption>${strike.has(it.name) ? '<span class="vs__cross">✕</span>' : ""}</figure>`);
    const decisionBlock = `
      <div class="decis reveal">
        <span class="decis__opt decis__build">Build<span class="decis__patch">Agentic !</span></span>
        <span class="decis__vs">vs</span>
        <span class="decis__opt">Buy</span>
      </div>`;
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="vs">${cells.join('<div class="vs__sep">VS</div>')}</div>
      ${s.decision ? decisionBlock : ""}`;
    const els = [...el.querySelectorAll(".vs__item, .vs__sep")];
    const crosses = [...el.querySelectorAll(".vs__cross")];
    let struck = false, crossed = false;
    const clearCrosses = () => { crossed = false; crosses.forEach((c) => c.classList.remove("on")); };
    return {
      el,
      onEnter() { struck = false; clearCrosses(); el.querySelector(".decis")?.classList.remove("is-struck");
        els.forEach((x, i) => { x.classList.remove("on"); setTimeout(() => x.classList.add("on"), 250 + i * 300); }); },
      onExit()  { struck = false; clearCrosses(); el.querySelector(".decis")?.classList.remove("is-struck");
        els.forEach((x) => x.classList.remove("on")); },
      advance() {
        if (s.decision && !struck) { struck = true; el.querySelector(".decis")?.classList.add("is-struck"); return true; }
        if (crosses.length && !crossed) { crossed = true; crosses.forEach((c) => c.classList.add("on")); return true; }
        return false;
      }
    };
  },

  // Tricol — 3 colonnes titrées, chacune révélée au clic (items empilés).
  // `cols` = [{ title, accent?, items:[...] }]. media/bgVideo possibles.
  tricol(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--tricol");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="tri">${s.cols.map((c, ci) => `
        <div class="tri__col" data-col="${ci}"${c.accent ? ` data-accent="${c.accent}"` : ""}>
          <div class="tri__title">${c.title}</div>
          <ul class="tri__list${c.marked ? " tri__list--marked" : ""}">${c.items.map((it) => {
            const t = (typeof it === "string") ? it : it.t;
            const mark = (typeof it === "object" && it.mark) ? it.mark : null;
            const glyph = mark === "ok" ? "✓" : mark === "ko" ? "✕" : mark === "robot" ? "🤖" : "";
            return `<li${mark ? ` data-mark="${mark}"` : ""}>${mark ? `<span class="tri__mark">${glyph}</span>` : ""}${t}</li>`;
          }).join("")}</ul>
        </div>`).join("")}</div>`;
    const cols = [...el.querySelectorAll(".tri__col")];
    let shown = 0;
    function reveal(ci) {
      const col = cols[ci]; if (!col) return;
      col.classList.add("on");
      [...col.querySelectorAll("li")].forEach((li, i) => setTimeout(() => li.classList.add("on"), 150 + i * 120));
    }
    return {
      el,
      onEnter() { cols.forEach((c) => { c.classList.remove("on"); c.querySelectorAll("li").forEach((l) => l.classList.remove("on")); });
        shown = 0; },   // aucune colonne à l'entrée — tout au clic
      onExit()  { shown = 0; cols.forEach((c) => { c.classList.remove("on"); c.querySelectorAll("li").forEach((l) => l.classList.remove("on")); }); },
      advance() { if (shown < cols.length) { reveal(shown); shown++; return true; } return false; }
    };
  },

  stat(s) {
    const el = sceneEl(s.media, s.bgVideo);
    const f = fmt[s.format] || fmt.raw;
    el.querySelector(".scene__content").innerHTML = `
      <div class="stat reveal" data-target="${s.value}">${f(0)}</div>
      <div class="stat__label reveal">${s.label}</div>`;
    const node = el.querySelector(".stat");
    return {
      el,
      onEnter() {
        d3.select(node).transition().duration(1200).ease(d3.easeCubicOut)
          .tween("count", () => { const i = d3.interpolateNumber(0, +node.dataset.target);
            return (t) => { node.textContent = f(i(t)); }; });
      },
      onExit() { node.textContent = f(0); }
    };
  },

  quote(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--quote");
    el.querySelector(".scene__content").innerHTML = `
      <blockquote class="quote reveal">${s.text}</blockquote>
      ${s.cite ? `<cite class="reveal">${s.cite}</cite>` : ""}`;
    return { el };
  },

  // Disclaimer — triangle ⚠️ + « DISCLAIMER » rouge relief, puis les items s'enchaînent
  // AU CLIC, séparés par un point « · » (pas de puces), comme une phrase qui se construit.
  disclaimer(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--disclaimer");
    const items = (s.items || []).map((it, i) =>
      `${i > 0 ? " " : ""}<span class="disc__item">${it}</span>`).join("");
    // couches "télé" : canvas de bruit statique + scanlines + vignette CRT
    el.insertAdjacentHTML("afterbegin",
      `<canvas class="disc__noise"></canvas><div class="disc__scan"></div><div class="disc__crt"></div>`);
    el.querySelector(".scene__content").innerHTML = `
      <div class="disc__warn reveal">
        <svg viewBox="0 0 100 88" class="disc__tri"><path d="M50 5 L95 83 L5 83 Z" fill="none" stroke="#ee1111" stroke-width="6" stroke-linejoin="round"/><rect x="46" y="30" width="8" height="30" rx="4" fill="#ee1111"/><circle cx="50" cy="70" r="5" fill="#ee1111"/></svg>
      </div>
      <h1 class="disc__title reveal" data-text="${s.title || "DISCLAIMER"}">${s.title || "DISCLAIMER"}</h1>
      ${s.body ? `<p class="disc__body reveal">${s.body}</p>` : ""}
      <p class="disc__line">${items}</p>`;

    const parts = [...el.querySelectorAll(".disc__item")];
    const steps = parts.map((n) => [n]);
    let shown = 0;
    const reset = () => { parts.forEach((n) => n.classList.remove("on")); shown = 0; };

    // --- bruit TV : petit buffer redimensionné à l'écran, régénéré à chaque frame ---
    const noiseCv = el.querySelector(".disc__noise");
    let raf = null;
    function drawNoise() {
      const W = 220, H = 130;   // petit buffer (upscalé par le CSS → gros grain façon TV)
      if (noiseCv.width !== W) { noiseCv.width = W; noiseCv.height = H; }
      const ctx = noiseCv.getContext("2d");
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(drawNoise);
    }
    function stopNoise() { if (raf) cancelAnimationFrame(raf); raf = null; }

    return {
      el,
      onEnter() { reset(); stopNoise(); drawNoise(); },
      onExit()  { reset(); stopNoise(); },
      advance() { if (shown < steps.length) { steps[shown].forEach((n) => n.classList.add("on")); shown++; return true; } return false; }
    };
  },

  text(s) {
    const el = sceneEl(s.media, s.bgVideo);
    if (s.big) el.classList.add("scene--bigtext");
    if (s.image) el.classList.add("scene--text-img");
    if (s.heading && !s.big && !s.plainTitle) el.classList.add("scene--titled");
    // items optionnels : chaque phrase sur SA PROPRE LIGNE, révélée au clic (empilement vertical)
    const itemsHtml = (s.items && s.items.length)
      ? s.items.map((it) => `<p class="txt__line"><span class="txt__item">${it}</span></p>`).join("")
      : "";
    const textBlock = `
      <h2 class="reveal">${s.heading}</h2>
      ${s.body ? `<p class="lead reveal">${s.body}</p>` : ""}
      ${itemsHtml}`;
    // image optionnelle à DROITE, révélée en dernier (illustration qui accompagne le propos)
    el.querySelector(".scene__content").innerHTML = s.image
      ? `<div class="txt-split"><div class="txt-split__text">${textBlock}</div>
           <img class="txt-split__img" src="${s.image}" alt="" /></div>`
      : textBlock;
    if (!s.items || !s.items.length) {
      // pas d'items : si image « au démarrage », l'afficher à l'entrée
      const img0 = el.querySelector(".txt-split__img");
      if (img0 && s.imageAtStart) return { el, onEnter() { img0.classList.add("on"); } };
      return { el };
    }
    const parts = [...el.querySelectorAll(".txt__item")];
    const img = el.querySelector(".txt-split__img");
    // imageAtStart : la capture apparaît dès l'entrée (pas au dernier clic)
    const startImg = !!s.imageAtStart;
    let shown = 0, imgShown = false;
    const reset = () => { parts.forEach((n) => n.classList.remove("on")); shown = 0;
      imgShown = false; img?.classList.remove("on"); };
    return {
      el,
      onEnter() { reset(); if (startImg && img) { img.classList.add("on"); imgShown = true; } },
      onExit() { reset(); },
      advance() {
        if (shown < parts.length) { parts[shown].classList.add("on"); shown++; return true; }
        if (img && !imgShown) { imgShown = true; img.classList.add("on"); return true; }
        return false;
      }
    };
  },

  // Metroline — une ligne « chemin de métro » qui entre hors-écran à gauche, serpente
  // horizontalement et pose des stations (éléments) révélées une par une au clic.
  // Multi-slides continues : `phase` décale l'onde pour que la sortie d'une slide
  // raccorde à l'entrée de la suivante (pas de discontinuité). `wave` = nb d'ondes.
  // s = { heading?, items:[...], color?, phase?, wave? }
  metroline(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--metro");
    const items = s.items || [];
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <svg class="metro__svg" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
        <path class="metro__line" fill="none" stroke="${s.color || "var(--accent)"}" stroke-width="12"
              stroke-linecap="round" d=""/>
        <g class="metro__stations"></g>
      </svg>`;
    const svg = el.querySelector(".metro__svg");
    const path = el.querySelector(".metro__line");
    const gStations = el.querySelector(".metro__stations");

    // AXE VERTICAL : la ligne descend du HAUT (hors-écran) vers le BAS (hors-écran),
    // en serpentant latéralement : x = W/2 + amp·sin(phase + progression·wave·2π), y progresse.
    // « phase » fait que la fin (bas) d'une slide raccorde au début (haut) de la suivante.
    const N = items.length;
    const W = 1000, H = 620, m = 70;
    // amplitude plus GRANDE ; chaque slide DÉMARRE au centre-haut (sin(0)=0 → x=W/2) puis
    // serpente : la ligne « descend d'en haut » sur CHAQUE slide (indépendant du chaînage).
    const amp = W * 0.34, phase = s.phase || 0, wave = s.wave || 2.2;
    const xAt = (t) => W / 2 + Math.sin(phase + t * Math.PI * wave) * amp;
    const xs = [], ys = [];
    for (let i = 0; i < N; i++) {
      const t = N > 1 ? i / (N - 1) : 0.5;
      ys.push(m + t * (H - 2 * m));
      xs.push(xAt(t));
    }
    el.dataset.exitPhase = String(phase + Math.PI * wave);
    // path lissé, VERTICAL : amorce depuis le HAUT-CENTRE (W/2, -80) vers la 1re station,
    // puis serpente jusqu'en bas hors-écran.
    let dd = `M ${W / 2} -120`;
    for (let i = 0; i < N; i++) {
      const px = xs[i], py = ys[i];
      const prevx = i === 0 ? W / 2 : xs[i - 1], prevy = i === 0 ? -120 : ys[i - 1];
      const cy = (prevy + py) / 2;
      dd += ` C ${prevx} ${cy}, ${px} ${cy}, ${px} ${py}`;
    }
    dd += ` L ${xs[N - 1] || W / 2} ${H + 120}`;   // sort par le bas hors-champ
    path.setAttribute("d", dd);
    const totalLen = path.getTotalLength();
    path.style.strokeDasharray = totalLen;
    path.style.strokeDashoffset = totalLen;

    // stations (point + label) posées à chaque item ; label à gauche/droite selon le côté
    items.forEach((it, i) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "metro__st");
      g.setAttribute("transform", `translate(${xs[i]},${ys[i]})`);
      const rightSide = xs[i] < W / 2;   // station à gauche → label à droite, et vice-versa
      g.innerHTML =
        `<circle r="10" class="metro__dot"/>` +
        `<text class="metro__lbl" x="${rightSide ? 26 : -26}" y="6" text-anchor="${rightSide ? "start" : "end"}">${it}</text>`;
      gStations.appendChild(g);
    });
    const sts = [...el.querySelectorAll(".metro__st")];

    let shown = 0;
    function revealTo(k) {
      // dessine la ligne jusqu'à la station k (proportion de longueur), révèle les stations 0..k
      const frac = N > 1 ? (k + 1) / (N + 1) : 1;   // +1 pour laisser un bout après la dernière
      path.style.strokeDashoffset = totalLen * (1 - frac);
      sts.forEach((g, i) => g.classList.toggle("on", i <= k));
    }
    return {
      el,
      onEnter() { shown = 0; path.style.strokeDashoffset = totalLen; sts.forEach((g) => g.classList.remove("on")); },
      onExit()  { shown = 0; path.style.strokeDashoffset = totalLen; sts.forEach((g) => g.classList.remove("on")); },
      advance() {
        if (shown < N) { revealTo(shown); shown++; return true; }
        // dernier clic : prolonge la ligne jusqu'à la sortie
        if (shown === N) { path.style.strokeDashoffset = 0; shown++; return true; }
        return false;
      }
    };
  },

  // Tentation — titre centré (comme To be continued) puis les captures défilent
  // Coupures de journaux qui TOMBENT du haut et s'écrasent avec rebond (façon slide
  // « SaaSpocalypse » du deck fivetran) : chaque capture chute au clic, avec overshoot
  // à l'atterrissage, et BOUSCULE les coupures déjà posées (micro-secousse).
  tentation(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--tentation");
    // positions/rotations d'atterrissage façon coupures jetées sur la table
    const POSE = [
      { x: "-6%", y: "-2%", rot: "-5deg" },
      { x: "8%",  y: "7%",  rot: "5deg"  },
      { x: "-3%", y: "11%", rot: "-3deg" },
      { x: "5%",  y: "-7%", rot: "4deg"  },
    ];
    const imgs = (s.images || []).map((src, i) => {
      const p = POSE[i % POSE.length];
      return `<figure class="tent__clip" data-i="${i}"
        style="--x:${p.x}; --y:${p.y}; --rot:${p.rot}; z-index:${i + 1}">
        <img src="${src}" alt="" /></figure>`;
    }).join("");
    el.querySelector(".scene__content").innerHTML = `
      <h1 class="tent__title reveal">${s.title}</h1>
      <div class="tent__stage">${imgs}</div>`;
    const clips = [...el.querySelectorAll(".tent__clip")];
    let shown = 0;
    // bousculade : quand une coupure tombe, décale légèrement celles déjà posées
    function jostle(landed) {
      landed.forEach((d, k) => {
        const depth = landed.length - 1 - k, dir = (k % 2 === 0) ? 1 : -1;
        d.style.setProperty("--nx", dir * (3 + depth * 2) + "px");
        d.style.setProperty("--ny", depth * 3 + "px");
        d.style.setProperty("--nr", dir * (1 + depth * 0.6) + "deg");
      });
    }
    const reset = () => { shown = 0; clips.forEach((c) => { c.classList.remove("on");
      c.style.removeProperty("--nx"); c.style.removeProperty("--ny"); c.style.removeProperty("--nr"); });
      el.classList.remove("tent__shown"); };
    return {
      el,
      onEnter() { reset(); }, onExit() { reset(); },
      advance() {
        if (shown < clips.length) {
          clips[shown].classList.add("on"); shown++;
          jostle(clips.slice(0, shown));    // secoue toutes les coupures déjà tombées
          el.classList.add("tent__shown");
          return true;
        }
        return false;
      }
    };
  },

  // Roles — grille 3×2 de cartes « rôle ». Chaque carte affiche son titre d'emblée ;
  // au clic, les étiquettes (sous-points) apparaissent EN DESSOUS du titre, dans la carte,
  // sans recouvrir le titre ni s'empiler hors de la carte (une carte révélée par clic).
  roles(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--roles");
    if (s.heading && !s.plainTitle) el.classList.add("scene--titled");
    const cards = (s.roles || []).map((r, i) => `
      <div class="role" data-role="${i}">
        <div class="role__title">${r.title}</div>
        <ul class="role__labels">${(r.labels || []).map((l) =>
          `<li class="role__lbl">${l}</li>`).join("")}</ul>
      </div>`).join("");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="roles${(s.roles || []).every((r) => !(r.labels && r.labels.length)) ? " roles--tiles" : ""}"${s.cols ? ` style="grid-template-columns:repeat(${s.cols},1fr)"` : ""}>${cards}</div>`;
    // étiquettes simples (cartes titre seul) → révélées par colonne (paquet de `cols`) au clic
    const labelOnly = (s.roles || []).every((r) => !(r.labels && r.labels.length));
    const step = labelOnly && s.cols ? s.cols : 1;
    const roleEls = [...el.querySelectorAll(".role")];
    let shown = 0;   // nb de cartes dont les labels sont révélés
    const reset = () => { shown = 0; roleEls.forEach((r) => r.classList.remove("on")); };
    return {
      el,
      onEnter() { reset(); }, onExit() { reset(); },
      advance() {
        if (shown >= roleEls.length) return false;
        for (let k = 0; k < step && shown < roleEls.length; k++) { roleEls[shown].classList.add("on"); shown++; }
        return true;
      }
    };
  },

  // Rolesplit — 2 grands blocs en HAUT (Data/Context Engineering) au même niveau,
  // puis 1 grand bloc EN BAS regroupant les autres tâches en étiquettes. Révélé au clic :
  // les 2 blocs du haut d'abord, puis les étiquettes du bas une à une.
  rolesplit(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--rolesplit");
    if (s.heading && !s.plainTitle) el.classList.add("scene--titled");
    // 2 blocs du haut colorés (couleurs pétantes de la slide barres) : bleu + orange
    const TOP_COL = ["#3b82d6", "#f0a020"];
    const top = (s.top || []).map((t, i) =>
      `<div class="rs__top" style="--c:${TOP_COL[i % TOP_COL.length]}">${t}</div>`).join("");
    // étiquettes du bas = coupures de presse : inclinées + décalées haut/bas (quinconce)
    const CHIP_POSE = [
      { rot: "-3deg", dy: "-8px" }, { rot: "2.5deg", dy: "10px" }, { rot: "-2deg", dy: "-6px" },
      { rot: "3deg", dy: "8px" }, { rot: "-2.5deg", dy: "-10px" }, { rot: "2deg", dy: "6px" },
      { rot: "-3deg", dy: "9px" }, { rot: "2.5deg", dy: "-7px" },
    ];
    const chips = (s.bottom || []).map((t, i) => {
      const p = CHIP_POSE[i % CHIP_POSE.length];
      return `<span class="rs__chip" style="--rot:${p.rot};--dy:${p.dy}">${t}</span>`;
    }).join("");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="rs">
        <div class="rs__row">${top}</div>
        <div class="rs__box"><div class="rs__chips">${chips}</div></div>
      </div>`;
    const tops = [...el.querySelectorAll(".rs__top")];
    const box = el.querySelector(".rs__box");
    const chipEls = [...el.querySelectorAll(".rs__chip")];
    // ordre de révélation : chaque bloc du haut au clic (Data, puis Context), puis le bloc bas,
    // puis chaque étiquette
    let shown = 0;
    const steps = [...tops.map((t) => () => t.classList.add("on")),
                   () => box.classList.add("on"),
                   ...chipEls.map((c) => () => c.classList.add("on"))];
    const reset = () => { shown = 0; tops.forEach((t) => t.classList.remove("on"));
      box.classList.remove("on"); chipEls.forEach((c) => c.classList.remove("on")); };
    return {
      el,
      onEnter() { reset(); }, onExit() { reset(); },
      advance() { if (shown < steps.length) { steps[shown](); shown++; return true; } return false; }
    };
  },

  // Travail vivant — 2 colonnes : à GAUCHE des couvertures (coupures de presse qui
  // tombent), à DROITE des citations (mêmes coupures). Tout se pose au clic, en biais,
  // avec l'effet SaaSpocalypse (chute + rebond + bousculade).
  travailvivant(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--travail");
    if (s.heading && !s.plainTitle) el.classList.add("scene--titled");
    // deux couvertures superposées seulement d'un peu (~1/3), la 2e (Souffrance) devant
    const POSE_L = [{ x: "-16%", y: "-4%", rot: "-5deg" }, { x: "16%", y: "6%", rot: "4deg" }];
    const POSE_R = [
      { x: "-6%", y: "-24%", rot: "-4deg" }, { x: "8%", y: "-12%", rot: "3deg" },
      { x: "-4%", y: "2%", rot: "-3deg" }, { x: "7%", y: "14%", rot: "4deg" },
      { x: "-2%", y: "26%", rot: "-2deg" },
    ];
    const imgs = (s.images || []).map((src, i) => {
      const p = POSE_L[i % POSE_L.length];
      return `<figure class="tv__clip tv__img" data-k="img" style="--x:${p.x};--y:${p.y};--rot:${p.rot};z-index:${i + 1}"><img src="${src}" alt=""/></figure>`;
    }).join("");
    const quotes = (s.quotes || []).map((q, i) => {
      const p = POSE_R[i % POSE_R.length];
      return `<figure class="tv__clip tv__quote" data-k="q" style="--x:${p.x};--y:${p.y};--rot:${p.rot};z-index:${i + 10}"><blockquote>${q}</blockquote></figure>`;
    }).join("");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="tv">
        <div class="tv__col tv__left">${imgs}</div>
        <div class="tv__col tv__right">${quotes}</div>
      </div>`;
    // ordre de révélation : d'abord les 2 couvertures, puis les citations une à une
    const order = [...el.querySelectorAll(".tv__img"), ...el.querySelectorAll(".tv__quote")];
    let shown = 0;
    const reset = () => { shown = 0; order.forEach((c) => c.classList.remove("on")); };
    return {
      el,
      onEnter() { reset(); }, onExit() { reset(); },
      advance() { if (shown < order.length) { order[shown].classList.add("on"); shown++; return true; } return false; }
    };
  },

  // Prescription — métaphore visuelle du travail (Dejours) : 3 cadres pointillés
  // (la prescription, rigide) et des NUAGES VIVANTS (le réel) qui, au clic, se posent
  // dans les cadres, débordent de l'un sur l'autre, puis le « Réel » (rouge) sort du cadre.
  prescription(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--prescription");
    if (s.heading && !s.plainTitle) el.classList.add("scene--titled");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="presc__stage"><canvas class="presc__cv"></canvas></div>`;
    const stage = el.querySelector(".presc__stage");
    const cv = el.querySelector(".presc__cv");
    const frames = s.frames || [], blobs = s.blobs || [];
    // couleurs des nuages
    const COL = {
      neutral: [150, 150, 158], zele: [80, 150, 205], reel: [226, 84, 92],
      travail: [46, 160, 90],
    };
    let raf = null, shown = 0, t0 = 0;
    // état d'animation par blob : centre (cx,cy en px), rayon, wobble seed
    const anim = blobs.map((b, i) => ({ born: -1, seed: i * 1.7 }));

    // rectangle px d'un cadre (à partir des % du stage)
    function frameRect(id) {
      const f = frames.find((x) => x.id === id); if (!f) return null;
      const W = cv.width, H = cv.height;
      return { x: f.x / 100 * W, y: f.y / 100 * H, w: f.w / 100 * W, h: f.h / 100 * H };
    }

    function draw(now) {
      const W = cv.clientWidth || 1000, H = cv.clientHeight || 560;
      if (cv.width !== W) cv.width = W; if (cv.height !== H) cv.height = H;
      const ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      const time = (now - (t0 || now)) / 1000;

      // trace le chemin d'un nuage (sans le remplir) — réutilisable pour clip + fill
      function blobPath(cx, cy, rr, sx, sy, seed) {
        const lobes = 7;
        ctx.beginPath();
        for (let k = 0; k <= 44; k++) {
          const ang = k / 44 * Math.PI * 2;
          const wob = 1 + 0.10 * Math.sin(ang * lobes + time * 1.6 + seed)
                        + 0.06 * Math.sin(ang * 3 - time * 1.1 + seed);
          const px = cx + Math.cos(ang) * rr * wob * sx;
          const py = cy + Math.sin(ang) * rr * wob * sy;
          if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
      }

      // clip au COMPLÉMENT de TOUS les cadres (zone « hors prescription »)
      function clipOutsideAllFrames() {
        ctx.beginPath(); ctx.rect(0, 0, W, H);
        frames.forEach((f) => { const R = frameRect(f.id); roundRect(ctx, R.x, R.y, R.w, R.h, 14); });
        ctx.clip("evenodd");
      }
      // clip au complément des cadres du HAUT seulement (HG/HD) : le rouge doit remplir tout
      // le débordement du nuage réel sous ces cadres, sans être "protégé" par un cadre du bas (BD).
      function clipOutsideTopFrames() {
        ctx.beginPath(); ctx.rect(0, 0, W, H);
        frames.filter((f) => f.id === "HG" || f.id === "HD").forEach((f) => {
          const R = frameRect(f.id); roundRect(ctx, R.x, R.y, R.w, R.h, 14); });
        ctx.clip("evenodd");
      }
      // hachures rouges diagonales (remplit le chemin de clip courant)
      function redHatch(al) {
        ctx.save(); ctx.strokeStyle = `rgba(226,72,72,${al})`; ctx.lineWidth = 3;
        const step = 13;
        for (let x = -H; x < W + H; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke();
        }
        ctx.restore();
      }

      // 1) NUAGES bleus (style Magic). Le nuage `overflow` porte le rouge hachuré hors-cadre
      //    + un liseré vert au franchissement (le « travail » = bypasser la prescription).
      blobs.forEach((b, i) => {
        if (i >= shown) return;
        const a = anim[i];
        if (a.born < 0) a.born = time;
        const age = Math.min(1, (time - a.born) / 0.6);       // apparition 0.6s
        const ease = 1 - Math.pow(1 - age, 3);
        const host = frameRect(b.in); if (!host) return;
        const [r, g, bl] = COL[b.color] || COL.zele;
        // position via cx/cy (fractions du cadre hôte) — placement fidèle au croquis
        const cx = host.x + host.w * (b.cx ?? 0.5);
        const cy = host.y + host.h * (b.cy ?? 0.5);
        const base = Math.min(host.w, host.h) * 0.5;
        const rr = base * (b.fill || 0.6) * ease;
        const sx = b.overflow ? 1.25 : 1.15, sy = b.overflow ? 1.0 : 1.0;
        const alpha = 0.4 + 0.08 * Math.sin(time * 1.4 + a.seed);
        const drawFill = (col, al) => {
          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${al})`;
          ctx.shadowColor = `rgba(${col[0]},${col[1]},${col[2]},${0.4 * ease})`;
          ctx.shadowBlur = 22; ctx.fill(); ctx.shadowBlur = 0;
        };

        // (a) corps BLEU du nuage (tous les nuages)
        blobPath(cx, cy, rr, sx, sy, a.seed); drawFill([r, g, bl], alpha * ease);

        if (b.overflow) {
          // (b) HACHURES ROUGES = tout le nuage SOUS la ligne verte (l'arête basse des cadres
          //     du haut). Demi-plan y > bottom(HG/HD) → le débordement bas devient rouge,
          //     sans mordre au-dessus de la frontière ni dépendre des cadres du bas.
          const cutY = host.y + host.h;   // host EST déjà le rect du cadre hôte
          ctx.save(); blobPath(cx, cy, rr, sx, sy, a.seed); ctx.clip();  // dans le nuage…
          ctx.beginPath(); ctx.rect(0, cutY, W, H - cutY); ctx.clip();   // …ET sous la ligne verte
          redHatch(0.85 * ease);
          ctx.restore();
          // (c) LISERÉ VERT = la FRONTIÈRE bleu↔rouge : l'arête BASSE du cadre hôte (le nuage
          //     déborde SOUS les cadres), là où le nuage la franchit, clippée DANS le nuage.
          ctx.save(); blobPath(cx, cy, rr, sx, sy, a.seed); ctx.clip();  // clip au nuage
          ctx.lineWidth = 10; ctx.lineCap = "round";
          ctx.strokeStyle = `rgba(${COL.travail[0]},${COL.travail[1]},${COL.travail[2]},${0.85 * ease})`;
          // couvre l'arête basse des cadres du HAUT (HG+HD) sur toute la largeur qu'ils occupent
          const topFrames = frames.filter((f) => f.id === "HG" || f.id === "HD");
          topFrames.forEach((f) => { const R = frameRect(f.id);
            ctx.beginPath(); ctx.moveTo(R.x, R.y + R.h); ctx.lineTo(R.x + R.w, R.y + R.h); ctx.stroke(); });
          ctx.restore();
        }
        // label (« réel » en rouge)
        if (b.label) {
          const lc = b.overflow ? COL.reel : [r, g, bl];
          ctx.fillStyle = `rgba(${lc[0]},${lc[1]},${lc[2]},${ease})`;
          ctx.font = "700 " + Math.round(base * 0.42) + "px 'Playfair Display',Georgia,serif";
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.globalAlpha = ease; ctx.fillText(b.label, cx, cy - rr * 0.3); ctx.globalAlpha = 1;
        }
      });

      // 2) CADRES pointillés (prescription) + légende au-dessus du 1er cadre
      ctx.setLineDash([9, 8]); ctx.lineWidth = 2.2;
      ctx.strokeStyle = "rgba(107,93,79,.62)";
      frames.forEach((f) => {
        const R = frameRect(f.id);
        roundRect(ctx, R.x, R.y, R.w, R.h, 14); ctx.stroke();
      });
      ctx.setLineDash([]);
      // légende « Prescription » en gris au-dessus du cadre de gauche
      if (frames.length) {
        const R0 = frameRect(frames[0].id);
        ctx.fillStyle = "rgba(107,93,79,.7)";
        ctx.font = "600 " + Math.round(cv.width * 0.017) + "px 'Playfair Display',Georgia,serif";
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        ctx.fillText("Prescription", R0.x + 4, R0.y - 12);
      }

      // 3) label « travail » (vert) au-dessus du nuage qui déborde
      const ov = blobs.findIndex((x) => x.overflow);
      if (ov >= 0 && ov < shown) {
        const T = frameRect(blobs[ov].in);
        if (T) {
          ctx.fillStyle = `rgba(${COL.travail[0]},${COL.travail[1]},${COL.travail[2]},.85)`;
          ctx.font = "italic 700 " + Math.round(cv.width * 0.02) + "px 'Playfair Display',Georgia,serif";
          ctx.textAlign = "center"; ctx.textBaseline = "bottom";
          ctx.fillText("travail", T.x + T.w * 0.9, T.y - 6);
        }
      }
      raf = requestAnimationFrame(draw);
    }
    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function start() { if (!raf) { t0 = performance.now(); raf = requestAnimationFrame(draw); } }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
    return {
      el,
      onEnter() { shown = 0; anim.forEach((a) => (a.born = -1)); stop(); start(); },
      onExit()  { shown = 0; stop(); },
      advance() { if (shown < blobs.length) { shown++; return true; } return false; }
    };
  },

  // Wiki — reproduit une entête d'article Wikipédia + paragraphe ; au clic, un
  // surlignage jaune (feutre) balaie le span .wiki__hl du texte fourni.
  wiki(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--wiki");
    el.querySelector(".scene__content").innerHTML = `
      <div class="wiki">
        <div class="wiki__head">
          <h1 class="wiki__title">${s.title}</h1>
          <span class="wiki__langs">⌂A ${s.langs || ""} ⌄</span>
        </div>
        <div class="wiki__tabs">
          <span class="wiki__tab wiki__tab--on">Article</span><span class="wiki__tab">Talk</span>
          <span class="wiki__tabs-r">Read&nbsp;&nbsp;Edit&nbsp;&nbsp;View history&nbsp;&nbsp;⋮</span>
        </div>
        <div class="wiki__from">From Wikipedia, the free encyclopedia</div>
        <div class="wiki__body">${s.html}</div>
      </div>`;
    const hl = el.querySelector(".wiki__hl");
    let done = false;
    return {
      el,
      onEnter() { done = false; hl?.classList.remove("on"); },
      onExit()  { done = false; hl?.classList.remove("on"); },
      advance() { if (!done) { done = true; hl?.classList.add("on"); return true; } return false; }
    };
  },

  // titre + grande image centrée (capture, tweet…), révélée au clic.
  // dark:true → plein écran fond noir, titre clair centré. centerTitle:true → titre centré.
  figure(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--figure");
    if (s.dark) el.classList.add("scene--figure-dark");
    if (s.centerTitle) el.classList.add("scene--figure-center");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <img class="figure__img" src="${s.image}" alt="${s.alt || ""}" />
      ${s.caption ? `<p class="lead reveal figure__cap">${s.caption}</p>` : ""}`;
    const img = el.querySelector(".figure__img");
    let revealed = false;
    return {
      el,
      onEnter() { revealed = false; img.classList.remove("on"); },
      onExit()  { revealed = false; img.classList.remove("on"); },
      advance() { if (!revealed) { revealed = true; img.classList.add("on"); return true; } return false; }
    };
  },

  compare(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.querySelector(".scene__content").innerHTML = `
      <h2 class="reveal">${s.heading}</h2>
      <div class="compare reveal">
        <div class="compare__side"><div class="compare__val" data-target="${s.left.value}">0</div><div class="compare__lbl">${s.left.label}</div></div>
        <div class="compare__arrow">→</div>
        <div class="compare__side"><div class="compare__val" data-target="${s.right.value}">0</div><div class="compare__lbl">${s.right.label}</div></div>
      </div>
      ${s.caption ? `<p class="lead reveal">${s.caption}</p>` : ""}`;
    const vals = [...el.querySelectorAll(".compare__val")];
    return {
      el,
      onEnter() {
        vals.forEach((node) => {
          const i = d3.interpolateNumber(0, +node.dataset.target);
          d3.select(node).transition().duration(1100).ease(d3.easeCubicOut)
            .tween("c", () => (t) => { node.textContent = fmt.integer(i(t)); });
        });
      },
      onExit() { vals.forEach((n) => (n.textContent = "0")); }
    };
  },

  grid(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="grid">${s.cells.map((c, i) => `
        <div class="grid__cell" data-i="${i}" ${c.accent ? 'data-accent="1"' : ""}>
          <div class="grid__cell-title">${c.title}</div>
          ${c.sub ? `<div class="grid__cell-sub">${c.sub}</div>` : ""}
        </div>`).join("")}</div>
      ${s.caption ? `<p class="lead reveal">${s.caption}</p>` : ""}`;
    const cells = [...el.querySelectorAll(".grid__cell")];
    return {
      el,
      onEnter() { cells.forEach((c, i) => setTimeout(() => c.classList.add("on"), 250 + i * 350)); },
      onExit()  { cells.forEach((c) => c.classList.remove("on")); }
    };
  },

  table(s) {
    const el = sceneEl(s.media, s.bgVideo);
    const verdictClass = (v) => /✅|résiste|resist/i.test(v) ? "ok" : /❌/.test(v) ? "ko" : /⚠️/.test(v) ? "warn" : "";
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <table class="verdict"><thead><tr>${s.columns.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>${s.rows.map((r) => `<tr>${r.map((cell, ci) =>
        `<td class="${ci === r.length - 1 ? verdictClass(cell) : ""}">${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    const rows = [...el.querySelectorAll(".verdict tbody tr")];
    return {
      el,
      onEnter() { rows.forEach((tr, i) => setTimeout(() => tr.classList.add("on"), 250 + i * 320)); },
      onExit()  { rows.forEach((tr) => tr.classList.remove("on")); }
    };
  },

  // Chart D3 (line/bar) + couche optionnelle de coupures de presse (polaroïds)
  chart(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.querySelector(".scene__content").innerHTML = `
      <h2 class="reveal">${s.heading}</h2>
      <svg class="chart reveal" role="img" aria-label="${s.heading}"></svg>`;
    const svg = el.querySelector(".chart");

    let drops = [], timers = [];
    if (Array.isArray(s.drops) && s.drops.length) {
      const layer = document.createElement("div");
      layer.className = "drops";
      layer.innerHTML = s.drops.map((d) => `
        <figure class="drop" style="--x:${d.x};--y:${d.y};--rot:${d.rot}">
          <img src="${d.img}" alt="${d.caption || ""}" />
          ${d.caption ? `<figcaption>${d.caption}</figcaption>` : ""}
        </figure>`).join("");
      el.appendChild(layer);
      drops = [...layer.querySelectorAll(".drop")];
    }

    const CURVE_MS = 1400, FIRST_GAP = 800, ACCEL = 0.72, MIN_GAP = 120;
    function dropDelays(n) {
      const out = []; let t = CURVE_MS, gap = FIRST_GAP;
      for (let i = 0; i < n; i++) { out.push(t); t += gap; gap = Math.max(MIN_GAP, gap * ACCEL); }
      return out;
    }
    function settle(landed) {
      landed.forEach((d, k) => {
        const depth = landed.length - 1 - k, dir = (k % 2 === 0) ? 1 : -1;
        d.style.setProperty("--nx", dir * (4 + depth * 2) + "px");
        d.style.setProperty("--ny", depth * 3 + "px");
        d.style.setProperty("--nr", dir * (1.2 + depth * 0.6) + "deg");
        d.style.zIndex = String(10 + k);
        d.classList.toggle("jostled", depth > 0);
      });
    }
    return {
      el,
      onEnter() {
        (s.chart === "bar" ? drawBars : drawLine)(svg, s.data, s.highlight);
        const landed = [], delays = dropDelays(drops.length);
        drops.forEach((d, i) => timers.push(setTimeout(() => {
          d.classList.add("landed"); landed.push(d); settle(landed);
        }, delays[i])));
      },
      onExit() {
        timers.forEach(clearTimeout); timers = [];
        d3.select(svg).selectAll("*").remove();
        drops.forEach((d) => { d.classList.remove("landed", "jostled");
          d.style.removeProperty("--nx"); d.style.removeProperty("--ny"); d.style.removeProperty("--nr"); d.style.zIndex = ""; });
      }
    };
  },

  // Marquee — rubans de logos qui défilent en boucle infinie
  marquee(s) {
    const el = sceneEl(s.media, s.bgVideo);
    const rowHtml = (row) => {
      const tiles = row.items.map((it) =>
        `<div class="mq__tile"><img src="${it.img}" alt="${it.name || ""}" /></div>`).join("");
      const dir = row.dir === "right" ? "mq--right" : "mq--left";
      return `<div class="mq__row"><div class="mq__track ${dir}" style="--dur:${(row.speed || 40)}s">${tiles}${tiles}</div></div>`;
    };
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      ${s.subtitle ? `<p class="lead reveal">${s.subtitle}</p>` : ""}`;
    const wall = document.createElement("div");
    wall.className = "mq reveal";
    wall.innerHTML = s.rows.map(rowHtml).join("");
    el.querySelector(".scene__content").appendChild(wall);
    return { el };
  },

  // Modèle multi-faces (non utilisé dans le deck courant, gardé pour réemploi)
  model(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="faces">${s.faces.map((f) => `
        <div class="face"${f.accent ? ` data-accent="${f.accent}"` : ""}>
          <div class="face__tag">${f.tag}</div>
          <div class="face__title">${f.title}</div>
          <div class="face__desc">${f.desc}</div>
        </div>`).join("")}</div>`;
    return { el };
  },

  // Embed — poster (screenshot) au départ, bascule sur la vidéo au 1er clic
  embed(s) {
    const el = sceneEl(null);
    el.classList.add("scene--embed");
    el.querySelector(".scene__content").innerHTML = `
      ${s.title ? `<div class="embed__title reveal">${s.title}</div>` : ""}
      <div class="embed__frame reveal">
        ${s.poster ? `<img class="embed__poster" src="${s.poster}" alt="" />` : ""}
        <video class="embed__video" muted loop playsinline preload="auto" src="${s.video}"></video>
      </div>`;
    const video = el.querySelector(".embed__video");
    const frame = el.querySelector(".embed__frame");
    let played = false;
    function reset() { played = false; frame.classList.remove("playing"); try { video.pause(); video.currentTime = 0; } catch (e) {} }
    return {
      el,
      onEnter() { reset(); },
      onExit()  { reset(); },
      advance() {
        if (!played) { played = true; frame.classList.add("playing");
          try { video.currentTime = 0; video.play(); } catch (e) {} return true; }
        return false;
      }
    };
  },

  // Dashboard — mini-indicateurs révélés un par un au clic
  dashboard(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--dash");
    const panelHtml = (p, i) => {
      const inner = p.kind === "stat"
        ? `<div class="dash__stat" data-target="${p.value}" data-format="${p.format || "raw"}">0</div>
           ${p.unit ? `<div class="dash__unit">${p.unit}</div>` : ""}`
        : `<svg class="dash__chart" data-i="${i}" role="img"></svg>`;
      return `<div class="dash__panel dash__panel--hidden" data-panel="${i}">
        <div class="dash__title">${p.title}</div>
        ${inner}
        ${p.delta ? `<div class="dash__delta ${p.deltaDir || ""}">${p.delta}</div>` : ""}
        ${p.label ? `<div class="dash__label">${p.label}</div>` : ""}
        ${p.source ? `<div class="dash__source">${p.source}</div>` : ""}
      </div>`;
    };
    const pointsHtml = Array.isArray(s.points) && s.points.length
      ? `<div class="dash__points">${s.points.map((pt) =>
          `<span class="dash__point">${pt}</span>`).join('<span class="dash__sep">→</span>')}</div>`
      : (s.caption ? `<p class="lead reveal dash__caption">${s.caption}</p>` : "");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="dash">${s.panels.map(panelHtml).join("")}</div>
      ${pointsHtml}`;

    function revealPanel(i) {
      const p = s.panels[i];
      const panel = el.querySelector(`.dash__panel[data-panel="${i}"]`);
      if (!panel) return;
      panel.classList.remove("dash__panel--hidden");
      if (p.kind === "stat") {
        const node = panel.querySelector(".dash__stat");
        const f = fmt[p.format] || fmt.raw;
        d3.select(node).transition().duration(1100).ease(d3.easeCubicOut)
          .tween("c", () => { const it = d3.interpolateNumber(0, +node.dataset.target);
            return (t) => { node.textContent = f(it(t)); }; });
      } else {
        const svg = panel.querySelector(".dash__chart");
        (p.chart === "bar" ? drawBars : drawLine)(svg, p.data, p.highlight);
      }
    }
    function resetAll() {
      el.querySelectorAll(".dash__panel").forEach((panel) => panel.classList.add("dash__panel--hidden"));
      el.querySelectorAll(".dash__chart").forEach((svg) => d3.select(svg).selectAll("*").remove());
      el.querySelectorAll(".dash__stat").forEach((n) => (n.textContent = "0"));
    }
    let shown = 0;
    return {
      el,
      // tous les panels cachés à l'entrée → chaque clic en révèle un (conso, BCE, levées)
      onEnter() { resetAll(); shown = 0; },
      onExit()  { resetAll(); shown = 0; },
      advance() { if (shown < s.panels.length) { revealPanel(shown); shown++; return true; } return false; }
    };
  },

  // Bars2 — deux barres horizontales segmentées comparées (Avant / Aujourd'hui).
  // `rows` = [{ label, segments:[{name,pct,color?}] }]. Le clic révèle la 2e barre segment par segment.
  bars2(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--bars2");
    if (s.heading) el.classList.add("scene--titled");
    const palette = { spec: "#6ea8fe", code: "#9aa3b2", review: "#c9a2ff", value: "#ff5d6c" };
    // un segment avec `reveal:true` affiche "?" d'abord, puis son nom au clic (fondu)
    const rowHtml = (row, ri) => `
      <div class="b2__row" data-row="${ri}">
        <div class="b2__label">${row.label}</div>
        <div class="b2__track">${row.segments.map((seg, si) => `
          <div class="b2__seg${seg.reveal ? " b2__seg--q" : ""}${seg.empty ? " b2__seg--empty" : ""}" data-row="${ri}" data-seg="${si}"
               style="--pct:${seg.pct}%; --c:${seg.color || palette[seg.key] || "#6ea8fe"}">
            <span>${seg.reveal ? "?" : seg.name}</span>
          </div>`).join("")}</div>
      </div>`;
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      <div class="b2">${s.rows.map(rowHtml).join("")}</div>
      ${s.caption ? `<p class="lead reveal b2__cap">${s.caption}</p>` : ""}`;
    const segs = (ri) => [...el.querySelectorAll(`.b2__seg[data-row="${ri}"]`)];
    function grow(ri, stagger) {
      segs(ri).forEach((seg, i) => setTimeout(() => seg.classList.add("on"), stagger ? i * 350 : 0));
    }
    // le segment "?" à révéler (s'il existe)
    const qInfo = (() => {
      for (let ri = 0; ri < s.rows.length; ri++)
        for (let si = 0; si < s.rows[ri].segments.length; si++)
          if (s.rows[ri].segments[si].reveal) return { ri, si, name: s.rows[ri].segments[si].name };
      return null;
    })();
    let shown = 0, qRevealed = false;
    return {
      el,
      onEnter() {
        el.querySelectorAll(".b2__seg").forEach((x) => x.classList.remove("on"));
        shown = 1; qRevealed = false; grow(0, true);
      },
      onExit() { shown = 0; qRevealed = false; el.querySelectorAll(".b2__seg").forEach((x) => x.classList.remove("on")); },
      advance() {
        if (shown < s.rows.length) { grow(shown, true); shown++; return true; }
        // toutes les barres montrées → si un "?" reste, on le bascule en fondu vers son nom
        if (qInfo && !qRevealed) {
          qRevealed = true;
          const seg = el.querySelector(`.b2__seg[data-row="${qInfo.ri}"][data-seg="${qInfo.si}"]`);
          const span = seg?.querySelector("span");
          if (span) {
            span.style.transition = "opacity .35s ease";
            span.style.opacity = "0";
            setTimeout(() => { span.textContent = qInfo.name; span.style.opacity = "1"; }, 350);
          }
          return true;
        }
        return false;
      }
    };
  },

  // Dualline — barres (équipe) + courbe (automatisation) sur échelles indépendantes
  dualline(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--dual");
    el.querySelector(".scene__content").innerHTML = `
      ${s.heading ? `<h2 class="reveal">${s.heading}</h2>` : ""}
      ${s.subtitle ? `<p class="lead reveal">${s.subtitle}</p>` : ""}
      <div class="dual">
        <svg class="dual__svg reveal" role="img" aria-label="${s.heading || ""}"></svg>
        <div class="dual__legend reveal">${s.series.map((se) =>
          `<span class="dual__key"><i style="background:${se.color}"></i>${se.name}</span>`).join("")}</div>
      </div>`;
    const svg = el.querySelector(".dual__svg");
    const h2 = el.querySelector("h2");
    // markerReveal:true → les markers ne s'affichent qu'au clic (2e temps), losange grossi
    const deferMarkers = s.markerReveal && Array.isArray(s.markers) && s.markers.length;
    let revealed = false;
    return {
      el,
      onEnter() {
        revealed = false;
        if (h2 && s.heading) { h2.textContent = s.heading; h2.style.opacity = "1"; h2.style.transform = "none"; }
        drawDual(svg, s.x, s.series, deferMarkers ? [] : s.markers);
      },
      onExit() {
        revealed = false; d3.select(svg).selectAll("*").remove();
        if (h2 && s.heading) { h2.textContent = s.heading; h2.style.opacity = "1"; h2.style.transform = "none"; }
      },
      advance() {
        if (deferMarkers && !revealed) {
          revealed = true;
          // ajoute SEULEMENT le marqueur par-dessus (ne redessine pas le graphe), en emphase rouge
          drawDualMarkers(svg, s.x, s.markers, true);
          // au même clic : bascule le titre en fondu (sortant puis entrant)
          if (h2 && s.headingReveal) {
            h2.style.transition = "opacity .4s ease, transform .4s ease";
            h2.style.opacity = "0";
            h2.style.transform = "translateY(-10px)";
            setTimeout(() => {
              h2.textContent = s.headingReveal;
              h2.style.opacity = "1";
              h2.style.transform = "none";
            }, 400);
          }
          return true;
        }
        return false;
      }
    };
  },

  // Stack — logos en grille par couches, beats au clic (show/add/replace/absorb/morph)
  stack(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--stack");
    // paires replace {id → byId} : le remplaçant occupe le MÊME slot que le remplacé
    const replaceBy = {};   // id remplacé -> id remplaçant
    const replaces = new Set(); // ids qui sont des remplaçants
    s.beats.forEach((b) => (b.actions || []).forEach((a) => {
      if (a.op === "replace") { replaceBy[a.id] = a.byId; replaces.add(a.byId); }
    }));
    const tileFig = (id) => {
      const it = s.items.find((x) => x.id === id);
      return `<figure class="stk__tile" data-id="${it.id}">
        <img src="${it.img}" alt="${it.name}" /><figcaption>${it.name}</figcaption></figure>`;
    };
    // un id avec remplaçant devient un "slot" contenant les 2 tuiles superposées
    const tile = (id) => {
      if (replaceBy[id]) {
        return `<div class="stk__slot">${tileFig(id)}${tileFig(replaceBy[id])}</div>`;
      }
      return tileFig(id);
    };
    const cols = s.columns.map((c) =>
      // on saute les remplaçants : ils sont rendus dans le slot de leur remplacé
      `<div class="stk__col">${c.ids.filter((id) => !replaces.has(id)).map(tile).join("")}</div>`
    ).join('<div class="stk__flow">→</div>');
    el.querySelector(".scene__content").innerHTML = `
      <div class="stk__sub reveal"></div>
      <div class="stk__grid">${cols}</div>`;
    const subEl = el.querySelector(".stk__sub");
    const tileEl = (id) => el.querySelector(`.stk__tile[data-id="${id}"]`);

    let beat = 0;
    function applyBeat(b) {
      const def = s.beats[b];
      if (!def) return;
      subEl.innerHTML = def.sub || "";
      (def.actions || []).forEach((a) => {
        if (a.op === "show" || a.op === "add") tileEl(a.id)?.classList.add("on");
        if (a.op === "replace") { tileEl(a.byId)?.classList.add("on", "stk__repl"); tileEl(a.id)?.classList.add("stk__gone"); }
        if (a.op === "absorb") { tileEl(a.id)?.classList.add("stk__absorbed"); tileEl(a.underId)?.classList.add("stk__host"); }
        if (a.op === "morph") {
          const t = tileEl(a.id); if (!t) return;
          t.classList.add("stk__morph");
          const img = t.querySelector("img"), cap = t.querySelector("figcaption");
          const into = s.items.find((x) => x.id === a.into);
          if (img && into) img.src = into.img;
          if (cap && into) cap.textContent = into.name;
        }
      });
    }
    function clearTo(target) {
      s.items.forEach((it) => {
        const t = tileEl(it.id); t.className = "stk__tile";
        const img = t.querySelector("img"), cap = t.querySelector("figcaption");
        if (img) img.src = it.img; if (cap) cap.textContent = it.name;
      });
      for (let b = 0; b <= target; b++) applyBeat(b);
    }
    // upTo  : snapshot figé jouant les beats 0..upTo à l'entrée (pas de clic interne).
    // startAt/stopAt : stack interactive bornée — entre à `startAt`, avance au clic jusqu'à `stopAt`.
    // sinon : comportement classique à beats (de 0 au dernier).
    const hasUpTo = Number.isInteger(s.upTo);
    const startAt = Number.isInteger(s.startAt) ? s.startAt : 0;
    const maxBeat = Number.isInteger(s.stopAt) ? s.stopAt : s.beats.length - 1;
    return {
      el,
      onEnter() {
        if (hasUpTo) { clearTo(s.upTo); }
        else { beat = startAt; clearTo(startAt); }
      },
      onExit()  { clearTo(-1); beat = startAt; },
      advance() {
        if (hasUpTo) return false;          // un snapshot figé ne consomme pas le clic
        if (beat < maxBeat) { beat++; applyBeat(beat); return true; }
        return false;
      },
      retreat() {
        if (hasUpTo) return false;
        if (beat > startAt) { beat--; clearTo(beat); return true; }
        return false;
      }
    };
  },

  // ============================================================
  // Cellular — soupe cellulaire métaball (WebGL / p5), pilotée par BEATS.
  //   Délègue au module cellular.js. Scène plein écran immersive :
  //   les cellules FUSIONNENT organiquement (shader métaball), persistent
  //   par id, flottent (Perlin). Frise « métro+cardiogramme » fusionnée
  //   en bas, qui se construit au clic et devient turbulente. Chapitres
  //   en voile + fondu. Aucune image de fond (fond sombre pur).
  // s = { beats:[{ chapter?, caption?, tempo?, add?, morph?, absorb?, station? }] }
  // ============================================================
  cellular(s) {
    const el = sceneEl(null);           // pas de média de fond
    el.classList.add("scene--cellular");
    const host = document.createElement("div");
    host.className = "cellular-host";
    el.querySelector(".scene__content").appendChild(host);
    let engine = null;
    return {
      el,
      onEnter() {
        if (!engine) engine = new Cellular(host, s.beats);
        engine.enter();
      },
      onExit() { if (engine) engine.exit(); },
      advance() { return engine ? engine.advance() : false; },
      retreat() { return engine ? engine.retreat() : false; }
    };
  }
};

/* ---------- squelette d'une scène ---------- */
function sceneEl(media, bgVideo) {
  const el = document.createElement("section");
  el.className = "scene";
  let bg = "";
  if (bgVideo) {
    bg = `<video class="scene__video" autoplay muted loop playsinline src="${bgVideo}"></video><div class="scene__overlay scene__overlay--strong"></div>`;
  } else if (media) {
    bg = `<div class="scene__media" style="background-image:url('${media}')"></div><div class="scene__overlay"></div>`;
  }
  el.innerHTML = `${bg}<div class="scene__content"></div>`;
  return el;
}

/* ---------- charts D3 ---------- */
function chartDims(svg) {
  const W = svg.clientWidth || 640, H = svg.clientHeight || 380;
  return { W, H, m: { t: 14, r: 16, b: 32, l: 52 } };
}

function drawBars(svg, data, highlight) {
  const { W, H, m } = chartDims(svg);
  const sel = d3.select(svg).attr("viewBox", `0 0 ${W} ${H}`);
  sel.selectAll("*").remove();
  const x = d3.scaleBand().domain(data.map((d) => d.label)).range([m.l, W - m.r]).padding(0.25);
  const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value) * 1.1]).range([H - m.b, m.t]);
  sel.append("g").attr("transform", `translate(0,${H - m.b})`).call(d3.axisBottom(x));
  sel.append("g").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).ticks(4).tickFormat(d3.format("~s")));
  sel.selectAll(".bar").data(data).join("rect")
    .attr("class", (d, i) => "bar" + (i === highlight ? " bar--hl" : ""))
    .attr("x", (d) => x(d.label)).attr("width", x.bandwidth())
    .attr("y", H - m.b).attr("height", 0)
    .transition().duration(900).delay((d, i) => i * 70).ease(d3.easeCubicOut)
    .attr("y", (d) => y(d.value)).attr("height", (d) => H - m.b - y(d.value));
}

function drawLine(svg, data, highlight) {
  const { W, H, m } = chartDims(svg);
  const sel = d3.select(svg).attr("viewBox", `0 0 ${W} ${H}`);
  sel.selectAll("*").remove();
  const x = d3.scalePoint().domain(data.map((d) => d.label)).range([m.l, W - m.r]).padding(0.5);
  const vmin = Math.min(0, d3.min(data, (d) => d.value));
  const vmax = d3.max(data, (d) => d.value);
  const pad = (vmax - vmin) * 0.12 || 1;
  const y = d3.scaleLinear().domain([vmin - (vmin < 0 ? pad : 0), vmax + pad]).range([H - m.b, m.t]);
  const narrow = W < 380 || data.length > 5;
  const keep = narrow ? new Set([0, Math.floor((data.length - 1) / 2), data.length - 1, highlight]) : null;
  const xAxis = d3.axisBottom(x).tickFormat((d, i) => (!keep || keep.has(i)) ? d : "");
  sel.append("g").attr("transform", `translate(0,${H - m.b})`).call(xAxis).call((g) => g.selectAll(".tick line").remove());
  sel.append("g").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).ticks(3).tickFormat(d3.format("~s")));
  const line = d3.line().x((d) => x(d.label)).y((d) => y(d.value)).curve(d3.curveMonotoneX);
  const path = sel.append("path").datum(data).attr("class", "line").attr("fill", "none")
    .attr("stroke", "var(--accent)").attr("stroke-width", 2.5).attr("d", line);
  const len = path.node().getTotalLength();
  path.attr("stroke-dasharray", `${len} ${len}`).attr("stroke-dashoffset", len)
    .transition().duration(1400).ease(d3.easeCubicInOut).attr("stroke-dashoffset", 0);
  sel.selectAll(".dot").data(data).join("circle")
    .attr("class", (d, i) => "dot" + (i === highlight ? " dot--hl" : ""))
    .attr("cx", (d) => x(d.label)).attr("cy", (d) => y(d.value)).attr("r", 0)
    .attr("fill", (d, i) => i === highlight ? "var(--hot)" : "var(--accent)")
    .transition().delay((d, i) => 200 + i * 100).duration(300).attr("r", (d, i) => i === highlight ? 7 : 4);
  if (highlight != null && data[highlight]) {
    const d = data[highlight];
    sel.append("text").attr("class", "hl-label").attr("x", x(d.label)).attr("y", y(d.value) - 14)
      .attr("text-anchor", "middle").attr("fill", "var(--hot)").attr("font-weight", "700")
      .text(d.note || d.value.toLocaleString("fr-FR"))
      .attr("opacity", 0).transition().delay(1400).duration(400).attr("opacity", 1);
  }
}

// marge commune (haut généreux pour loger le losange + label des markers)
const DUAL_M = { t: 56, r: 54, b: 36, l: 54 };
function dualX(svg, labels) {
  const { W } = chartDims(svg);
  return d3.scalePoint().domain(labels).range([DUAL_M.l, W - DUAL_M.r]).padding(0.5);
}

function drawDual(svg, labels, series, markers, emphasis) {
  const { W, H } = chartDims(svg);
  const m = DUAL_M;
  const sel = d3.select(svg).attr("viewBox", `0 0 ${W} ${H}`);
  sel.selectAll("*").remove();
  const x = d3.scalePoint().domain(labels).range([m.l, W - m.r]).padding(0.5);
  const scaleFor = (se) => d3.scaleLinear()
    .domain([Math.min(0, d3.min(se.values)), d3.max(se.values) * 1.15]).range([H - m.b, m.t]);
  const scales = series.map(scaleFor);
  const keep = labels.length > 5 ? new Set([0, Math.floor((labels.length - 1) / 2), labels.length - 1]) : null;
  sel.append("g").attr("transform", `translate(0,${H - m.b})`)
    .call(d3.axisBottom(x).tickFormat((d, i) => (!keep || keep.has(i)) ? d : ""))
    .call((g) => g.selectAll(".tick line").remove());
  if (markers) drawDualMarkers(svg, labels, markers, emphasis);
  const bw = Math.min(54, (W - m.l - m.r) / labels.length * 0.5);
  series.forEach((se, si) => {
    const y = scales[si];
    if (se.kind === "bars") {
      sel.selectAll(`.bar-${si}`).data(se.values).join("rect")
        .attr("x", (d, i) => x(labels[i]) - bw / 2).attr("width", bw)
        .attr("y", H - m.b).attr("height", 0).attr("rx", 3).attr("fill", se.color).attr("opacity", 0.9)
        .transition().duration(800).delay((d, i) => i * 90).ease(d3.easeCubicOut)
        .attr("y", (d) => y(d)).attr("height", (d) => H - m.b - y(d));
    } else {
      const line = d3.line().x((d, i) => x(labels[i])).y((d) => y(d)).curve(d3.curveMonotoneX);
      const path = sel.append("path").datum(se.values).attr("fill", "none")
        .attr("stroke", se.color).attr("stroke-width", 3.5).attr("d", line);
      const len = path.node().getTotalLength();
      path.attr("stroke-dasharray", `${len} ${len}`).attr("stroke-dashoffset", len)
        .transition().duration(1600).ease(d3.easeCubicInOut).attr("stroke-dashoffset", 0);
      sel.selectAll(`.dot-${si}`).data(se.values).join("circle")
        .attr("cx", (d, i) => x(labels[i])).attr("cy", (d) => y(d)).attr("r", 0).attr("fill", se.color)
        .transition().delay((d, i) => 300 + i * 90).duration(250).attr("r", 4);
    }
  });
}

// Dessine UNIQUEMENT les marqueurs par-dessus le graphe existant (sans rien effacer/redessiner).
function drawDualMarkers(svg, labels, markers, emphasis) {
  const { H } = chartDims(svg);
  const m = DUAL_M;
  const sel = d3.select(svg);
  const x = dualX(svg, labels);
  (markers || []).forEach((mk) => {
    const px = x(labels[mk.at]);
    const dsz = emphasis ? 16 : 7;
    const dy = m.t + 8; // centre du losange, sous le bord haut
    const HOT = "#d64f7c"; // rose thème conte (var(--hot) ne se résout pas toujours dans un attr SVG)
    const g = sel.append("g").attr("class", "dual-marker").attr("opacity", 0);
    g.append("line").attr("x1", px).attr("x2", px).attr("y1", dy).attr("y2", H - m.b)
      .attr("stroke", emphasis ? HOT : "#3a4150")
      .attr("stroke-width", emphasis ? 3 : 1).attr("stroke-dasharray", "4 3");
    g.append("path")
      .attr("d", `M ${px} ${dy - dsz} L ${px + dsz} ${dy} L ${px} ${dy + dsz} L ${px - dsz} ${dy} Z`)
      .attr("fill", emphasis ? HOT : "#3a4150");
    g.append("text").attr("x", px).attr("y", dy - dsz - 10).attr("text-anchor", "middle")
      .attr("fill", emphasis ? HOT : "var(--muted)")
      .attr("font-size", emphasis ? "26px" : "12px").attr("font-weight", emphasis ? "800" : "600")
      .text(mk.label);
    g.transition().duration(450).attr("opacity", 1);
  });
}

/* ---------- 2) MOTEUR DE PROGRESSION (unifié, avec beats) ---------- */
export async function mountDeck(rootSel, deckUrl) {
  const deckRoot = document.querySelector(rootSel);
  const deck = await fetch(deckUrl).then((r) => r.json());
  document.title = deck.meta?.title || "StoryDeck";

  const scenes = deck.scenes.map((s) => {
    const r = renderers[s.type];
    if (!r) { console.warn("type inconnu:", s.type); return renderers.text({ heading: "(type inconnu)", body: s.type }); }
    return r(s);
  });
  scenes.forEach(({ el }) => deckRoot.appendChild(el));

  let current = 0, isAnimating = false;

  const dots = document.getElementById("dots");
  scenes.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Scène ${i + 1}`);
    b.onclick = (e) => { e.stopPropagation(); goTo(i); };
    dots.appendChild(b);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
        setActive(scenes.findIndex((s) => s.el === entry.target));
      }
    });
  }, { threshold: [0, 0.6, 1] });
  scenes.forEach((s) => io.observe(s.el));

  function setActive(idx) {
    if (idx === current || idx < 0) return;
    scenes[current]?.onExit?.();
    scenes[current]?.el.classList.remove("is-active");
    current = idx;
    scenes[current].el.classList.add("is-active");
    scenes[current].onEnter?.();
    updateChrome();
  }

  function goTo(idx) {
    idx = Math.max(0, Math.min(scenes.length - 1, idx));
    isAnimating = true;
    scenes[idx].el.scrollIntoView({ behavior: "smooth", block: "start" });
    clearTimeout(goTo._t);
    goTo._t = setTimeout(() => { isAnimating = false; setActive(idx); }, 700);
  }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  function forward() {
    const sc = scenes[current];
    if (sc?.advance && sc.advance()) { updateChrome(); return; }
    next();
  }
  function backward() {
    const sc = scenes[current];
    if (sc?.retreat && sc.retreat()) { updateChrome(); return; }
    prev();
  }

  addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); forward(); }
    if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); backward(); }
  });
  addEventListener("click", (e) => { if (!e.target.closest("#dots")) forward(); });

  let wheelLock = false;
  addEventListener("wheel", (e) => {
    if (isAnimating || wheelLock) { e.preventDefault(); return; }
    if (Math.abs(e.deltaY) < 8) return;
    e.preventDefault();
    wheelLock = true;
    (e.deltaY > 0 ? forward : backward)();
    setTimeout(() => { wheelLock = false; }, 750);
  }, { passive: false });

  function updateChrome() {
    document.getElementById("progress").style.width = (current / (scenes.length - 1) * 100) + "%";
    [...dots.children].forEach((d, i) => d.classList.toggle("active", i === current));
  }

  scenes[0].el.classList.add("is-active");
  scenes[0].onEnter?.();
  updateChrome();
}
