/* Smooth scrolling
   Eases mouse-wheel scrolling with a lerp animation for a fluid feel,
   and falls back to native smooth scroll (via CSS) for touch/keyboard
   and for users who've asked for reduced motion. */
(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  var current = window.scrollY;
  var target = window.scrollY;
  var ease = 0.09;
  var ticking = false;

  function maxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function animate() {
    current += (target - current) * ease;

    if (Math.abs(target - current) < 0.5) {
      current = target;
      window.scrollTo(0, current);
      ticking = false;
      return;
    }

    window.scrollTo(0, current);
    requestAnimationFrame(animate);
  }

  window.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      target = clamp(target + e.deltaY, 0, maxScroll());

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(animate);
      }
    },
    { passive: false }
  );

  // Keep target in sync if the page is resized (content height changes)
  window.addEventListener("resize", function () {
    target = clamp(target, 0, maxScroll());
  });

  // Keep target in sync with any non-wheel scrolling (anchor links, keyboard, touch)
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        target = window.scrollY;
        current = window.scrollY;
      }
    },
    { passive: true }
  );
})();
