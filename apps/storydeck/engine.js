/* ============================================================
   StoryDeck — moteur générique
   Charge un deck.json et le rend. Trois couches : registre de scènes
   (renderers) · moteur de progression unifié (clic/flèche/molette →
   même index, avec beats internes) · chrome UI.
   ============================================================ */

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
    const cells = s.items.map((it) =>
      `<figure class="vs__item"><img src="${it.img}" alt="${it.name}" /><figcaption>${it.name}</figcaption></figure>`);
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
    let struck = false;
    return {
      el,
      onEnter() { struck = false; el.querySelector(".decis")?.classList.remove("is-struck");
        els.forEach((x, i) => { x.classList.remove("on"); setTimeout(() => x.classList.add("on"), 250 + i * 300); }); },
      onExit()  { struck = false; el.querySelector(".decis")?.classList.remove("is-struck");
        els.forEach((x) => x.classList.remove("on")); },
      advance() {
        if (s.decision && !struck) { struck = true; el.querySelector(".decis")?.classList.add("is-struck"); return true; }
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

  text(s) {
    const el = sceneEl(s.media, s.bgVideo);
    if (s.big) el.classList.add("scene--bigtext");
    el.querySelector(".scene__content").innerHTML = `
      <h2 class="reveal">${s.heading}</h2>
      ${s.body ? `<p class="lead reveal">${s.body}</p>` : ""}`;
    return { el };
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
      onEnter() { resetAll(); shown = 1; revealPanel(0); },
      onExit()  { resetAll(); shown = 0; },
      advance() { if (shown < s.panels.length) { revealPanel(shown); shown++; return true; } return false; }
    };
  },

  // Bars2 — deux barres horizontales segmentées comparées (Avant / Aujourd'hui).
  // `rows` = [{ label, segments:[{name,pct,color?}] }]. Le clic révèle la 2e barre segment par segment.
  bars2(s) {
    const el = sceneEl(s.media, s.bgVideo);
    el.classList.add("scene--bars2");
    const palette = { spec: "#6ea8fe", code: "#9aa3b2", review: "#c9a2ff", value: "#ff5d6c" };
    // un segment avec `reveal:true` affiche "?" d'abord, puis son nom au clic (fondu)
    const rowHtml = (row, ri) => `
      <div class="b2__row" data-row="${ri}">
        <div class="b2__label">${row.label}</div>
        <div class="b2__track">${row.segments.map((seg, si) => `
          <div class="b2__seg${seg.reveal ? " b2__seg--q" : ""}" data-row="${ri}" data-seg="${si}"
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
        .attr("y", H - m.b).attr("height", 0).attr("rx", 3).attr("fill", se.color).attr("opacity", 0.55)
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
    const HOT = "#ff2d55"; // var(--hot) ne se résout pas toujours dans un attr SVG → hex direct
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
