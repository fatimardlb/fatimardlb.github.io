/* Scroll-reveal: add .reveal class to content blocks,
   then observe them with IntersectionObserver.
   Falls back gracefully when JS or IntersectionObserver is unavailable. */
(function () {
  'use strict';

  // Mark HTML element so CSS can hook in only when JS runs
  document.documentElement.classList.add('js');

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  // Wait for DOM ready
  function init() {
    var selectors = [
      '.post-content h2',
      '.post-content h3',
      '.post-content p',
      '.post-content ul',
      '.post-content ol',
      '.post-content blockquote'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
