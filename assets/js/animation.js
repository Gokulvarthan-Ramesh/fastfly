/* ============================================
   FIRST FlY Digital Solutions — Animation System
   IntersectionObserver Scroll Reveal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Scroll Reveal (IntersectionObserver) ----------
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach(el => el.classList.add('active'));
    }

    // ---------- Staggered Reveal for Hero ----------
    const heroStagger = document.querySelectorAll('.hero-stagger');
    heroStagger.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.2}s`;
    });

    // ---------- Counter Animation ----------
    const counters = document.querySelectorAll('.stat-num[data-count]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds duration
        const start = performance.now();

        requestAnimationFrame(function animate(currentTime) {
            let timeFraction = (currentTime - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            const progress = 1 - Math.pow(1 - timeFraction, 3); // Ease out cubic
            const current = Math.floor(progress * target);

            el.textContent = current + suffix;

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                el.textContent = target + suffix;
            }
        });
    }

    // ---------- Parallax subtle effect for hero visual ----------
    const heroVisual = document.querySelector('.hero-visual-placeholder');
    if (heroVisual && window.matchMedia("(min-width: 1025px)").matches) {
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        let mouseX = 0, mouseY = 0;
        let ticking = false;

        window.addEventListener('resize', () => {
            winW = window.innerWidth;
            winH = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const x = (mouseX / winW - 0.5) * 20;
                    const y = (mouseY / winH - 0.5) * 20;
                    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

});
