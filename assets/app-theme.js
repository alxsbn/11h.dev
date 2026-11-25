/* Thème partagé des travaux 11h.dev (apps sous /apps/, enveloppes sous /work/ et /talk/).
   Le bouton soleil/lune du header enregistre localStorage.theme ('light' | 'dark') et pose
   <html data-theme>. Ce script reflète ce choix dans la page qui le charge ; sans choix
   enregistré, la page suit prefers-color-scheme. Il écoute l'événement storage : quand le
   header de l'enveloppe bascule le thème, l'app affichée dans l'iframe bascule en direct.
   À charger dans <head>, sans defer, pour éviter un flash du mauvais thème. */
(function () {
  var root = document.documentElement;
  function apply(v) {
    if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v);
    else root.removeAttribute('data-theme');
  }
  try { apply(localStorage.getItem('theme')); } catch (e) {}
  addEventListener('storage', function (e) {
    if (e.key === 'theme' || e.key === null) apply(e.newValue);
  });
})();
