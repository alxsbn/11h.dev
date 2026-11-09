/* Socle commun des grands formats 11h.dev.
   Usage : Longread.init({ nomDuGraphique(step) { ... }, ... })
   Chaque <section class="scrolly" data-graphic="nom"> appelle graphics[nom](data-step)
   quand une étape passe dans la zone de lecture. */
window.Longread = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = matchMedia('(max-width: 900px)').matches;
  const fr = n => n.toLocaleString('fr-FR').replace(/ | /g, ' ');

  function countTo(el, to, { from, dur = 900, fmt = fr } = {}) {
    const start = from ?? +(el.dataset.v || 0);
    el.dataset.v = to;
    if (reduce) { el.textContent = fmt(to); return; }
    cancelAnimationFrame(el._raf);
    const t0 = performance.now();
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(start + (to - start) * e);
      if (p < 1) el._raf = requestAnimationFrame(tick);
    };
    el._raf = requestAnimationFrame(tick);
  }

  function init(graphics = {}) {
    const ro = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach(el => ro.observe(el));

    const bar = $('#bar'), barChapter = $('#barChapter'), barProgress = $('#barProgress');
    new IntersectionObserver(([e]) => bar.classList.toggle('show', !e.isIntersecting), { threshold: 0.05 }).observe($('#hero'));
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) barChapter.textContent = e.target.dataset.chapter;
    }), { rootMargin: '-50% 0px -50% 0px' });
    $$('[data-chapter]').forEach(el => co.observe(el));

    const zoomEls = $$('[data-zoom]');
    function onScroll() {
      const h = innerHeight, max = document.documentElement.scrollHeight - h;
      barProgress.style.width = `${(scrollY / max) * 100}%`;
      if (reduce) return;
      for (const img of zoomEls) {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) continue;
        const p = Math.min(1, Math.max(0, (h - r.top) / (h + r.height)));
        const z = img.dataset.zoom === 'hero' ? 1.05 + p * 0.25 : 1.2 - p * 0.2;
        img.style.setProperty('--z', z.toFixed(3));
      }
    }
    let ticking = false;
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); }
    }, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();

    $$('.scrolly').forEach(sc => {
      const fn = graphics[sc.dataset.graphic];
      if (!fn) return;
      const steps = $$('.step', sc);
      const so = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        steps.forEach(s => s.classList.toggle('is-active', s === e.target));
        fn(e.target.dataset.step, sc);
      }), { rootMargin: narrow ? '-72% 0px -18% 0px' : '-45% 0px -45% 0px' });
      steps.forEach(s => so.observe(s));
      fn(steps[0].dataset.step, sc);
    });
  }

  return { init, countTo, fr, $, $$, reduce };
})();
