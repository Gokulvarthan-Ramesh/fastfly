/* ============================================
   FIRST FlYDigital Solution — Animation System
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
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current + suffix;
        }, 30);
    }

    // ---------- Parallax subtle effect for hero visual ----------
    const heroVisual = document.querySelector('.hero-visual-placeholder');
    if (heroVisual && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroVisual.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

});
