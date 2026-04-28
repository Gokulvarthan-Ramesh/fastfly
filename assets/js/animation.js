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
        cursor.style.opacity = '0'; // Hide initially

        document.addEventListener('mousemove', (e) => {
            cursor.style.opacity = '1';
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        document.querySelectorAll('a, button, .btn, .service-card-new, .portfolio-card-new').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ---------- Magnetic Elements ----------
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .watch-video-btn');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // ---------- Scroll Progress Bar ----------
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 3px; background: var(--primary);
        z-index: 10001; transition: width 0.1s; width: 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // ---------- Scroll Reveal (IntersectionObserver) ----------
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle Staggering for Grids
                if (entry.target.parentElement.classList.contains('services-bento') || 
                    entry.target.parentElement.classList.contains('portfolio-grid-new')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.12}s`;
                }
                
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('[class*="reveal"]');
    revealElements.forEach(el => revealObserver.observe(el));

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
