(function(){
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  var page = headerEl ? headerEl.getAttribute('data-page') : '';

  function markActive(root, current) {
    if (!root || !current) return;
    var links = root.querySelectorAll('a[data-nav="' + current + '"]');
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute('aria-current', 'page');
    }
  }

  function initNavDrawer() {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('menuToggle');
    if (!nav || !toggle) return;
    var links = document.querySelectorAll('#navLinks a');
    function setOpen(open) {
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    }
    toggle.addEventListener('click', function() {
      setOpen(!nav.classList.contains('open'));
    });
    links.forEach(function(a) {
      a.addEventListener('click', function() { setOpen(false); });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
    });
  }

  function fallbackHeader() {
    return '<div class="topbar"><div class="left">Al Sicomoro</div>' +
      '<div class="right"><a href="tel:+39022563527">02 2563527</a> · ' +
      '<a href="contatti.html"><strong>Prenota</strong></a></div></div>';
  }

  function fallbackFooter() {
    return '<footer><div class="footer-inner" style="text-align:center;padding:40px 20px">' +
      '<p>Al Sicomoro · Via P. Castaldi 19, Milano · ' +
      '<a href="tel:+39022563527">02 2563527</a></p></div></footer>';
  }

  function inject(el, url, fallback, after) {
    if (!el) { if (after) after(); return; }
    fetch(url)
      .then(function(r) { return r.ok ? r.text() : Promise.reject(); })
      .then(function(html) { el.innerHTML = html; })
      .catch(function() { el.innerHTML = fallback(); })
      .then(function() { if (after) after(); });
  }

  inject(headerEl, 'partials/header.html', fallbackHeader, function() {
    markActive(headerEl, page);
    initNavDrawer();
    if (window.__alsicomoroI18nRescan) window.__alsicomoroI18nRescan();
  });

  inject(footerEl, 'partials/footer.html', fallbackFooter, function() {
    markActive(footerEl, page);
    if (window.__alsicomoroI18nRescan) window.__alsicomoroI18nRescan();
  });
})();
