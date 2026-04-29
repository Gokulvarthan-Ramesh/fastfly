/* ============================================
   FIRST FlY Digital Solutions — Animation System
   IntersectionObserver Scroll Reveal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Preloader ----------
    const hidePreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.style.overflow = '';
                document.body.style.overflowX = 'hidden'; // Ensure no horizontal scroll
            }, 800);
        }
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }

    // Fallback: Force hide preloader after 4 seconds
    setTimeout(hidePreloader, 4000);

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';

  // ---------- Custom Cursor ----------
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    cursor.style.opacity = '0';
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let cursorTicking = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursorTicking) {
        requestAnimationFrame(() => {
          cursor.style.opacity = '1';
          cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          cursorTicking = false;
        });
        cursorTicking = true;
      }
    });

    document.querySelectorAll('a, button, .btn, .service-card-new, .portfolio-card-new').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ---------- Magnetic Elements (Optimized: Cache Rect) ----------
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .watch-video-btn');
  magneticElements.forEach(el => {
    let rect = null;
    let ticking = false;

    el.addEventListener('mouseenter', () => {
      rect = el.getBoundingClientRect(); // Read once on enter
    });

    el.addEventListener('mousemove', (e) => {
      if (!rect || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        ticking = false;
      });
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      rect = null;
    });
  });

  // ---------- Scroll Progress Bar (Optimized: Cached Height) ----------
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; background: var(--primary);
    z-index: 10001; transition: width 0.1s; width: 0;
  `;
  document.body.appendChild(progressBar);

  let docHeight = 0;
  let scrollTicking = false;

  // Delay calculation to avoid forced reflow during initial load
  requestAnimationFrame(() => {
    docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  });

  window.addEventListener('resize', () => {
    docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  });

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        if (docHeight === 0) {
           docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        }
        const winScroll = window.pageYOffset || document.documentElement.scrollTop;
        const scrolled = (winScroll / docHeight) * 100;
        progressBar.style.width = scrolled + "%";
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ---------- Scroll Reveal (IntersectionObserver) ----------
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Staggering logic (Read-only check)
        const parent = entry.target.parentElement;
        if (parent && (parent.classList.contains('services-bento') || parent.classList.contains('portfolio-grid-new'))) {
          const index = Array.from(parent.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.12}s`;
        }
        
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const revealElements = document.querySelectorAll('[class*="reveal"]');
  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Parallax & Hero Optimization ----------
  const heroVisual = document.querySelector('.hero-visual-placeholder');
  if (heroVisual && window.matchMedia("(min-width: 1025px)").matches) {
    let winW = window.innerWidth, winH = window.innerHeight;
    let mX = 0, mY = 0, pTicking = false;

    window.addEventListener('resize', () => {
      winW = window.innerWidth; winH = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mX = e.clientX; mY = e.clientY;
      if (!pTicking) {
        requestAnimationFrame(() => {
          const x = (mX / winW - 0.5) * 20;
          const y = (mY / winH - 0.5) * 20;
          heroVisual.style.transform = `translate(${x}px, ${y}px)`;
          pTicking = false;
        });
        pTicking = true;
      }
    });
  }
});
