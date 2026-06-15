/* ==================== Background Cut-in ==================== */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

/* ==================== Parallax ==================== */
(function bgParallax() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.body.style.setProperty('--bg-pos', 50 + (scrollY / maxScroll) * 10 + '%');
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ==================== DOM Ready ==================== */
document.addEventListener('DOMContentLoaded', () => {

  /* Nav Active */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* Dark Mode */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
  }

  /* Scroll Reveal */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.post-card, .project-card, .archive-item').forEach(el => {
    revealObserver.observe(el);
  });

  /* Search Redirect (non-index pages) */
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const isIndex = currentPage === 'index.html' || currentPage === '';
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !isIndex) {
        const q = searchInput.value.trim();
        window.location.href = 'index.html' + (q ? '?q=' + encodeURIComponent(q) : '');
      }
    });
    const urlQ = new URLSearchParams(window.location.search).get('q');
    if (urlQ && isIndex) {
      searchInput.value = urlQ;
      searchInput.dispatchEvent(new Event('input'));
    }
  }

  /* Back to Top */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Reading Progress Bar */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = Math.min((scrollTop / Math.max(docHeight, 1)) * 100, 100) + '%';
    });
  }

  /* Contact Form */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const orig = btn.textContent;
      btn.textContent = '\u2705 \u53D1\u9001\u6210\u529F\uFF01';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 2500);
    });
  }
});
