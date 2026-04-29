/* ============================================
   First Fly Digital solutions — Shared Components
   Navbar, Footer, WhatsApp Float, Scroll-to-Top
   Single source of truth for all pages.
   ============================================ */

(function () {
    // Detect current page for active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Inject Custom Styles to prevent caching issues
    const style = document.createElement('style');
    style.innerHTML = `
        .main-header { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; z-index: 9999 !important; }
        .nav-actions a[href="contact.html"] { 
            background-color: var(--primary) !important; 
            color: white !important; 
            padding: 12px 28px !important;
            border-radius: var(--radius-md) !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            font-size: 0.85rem !important;
            display: inline-block !important;
            transition: 0.3s !important;
            box-shadow: 0 4px 15px rgba(255, 93, 57, 0.2);
        }
        .nav-actions a[href="contact.html"]:hover { 
            background-color: var(--primary-dark) !important; 
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 20px rgba(255, 93, 57, 0.3) !important;
        }
    `;
    document.head.appendChild(style);

    // ---------- HEADER (Top Bar + Navbar) ----------
    const headerHTML = `
    <header class="main-header">
        <div class="top-bar">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
                <div class="top-bar-info" style="display: flex; gap: 25px;">
                    <span style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 600;">
                        <i class="fas fa-envelope" style="color: var(--primary);"></i> firstflydigitalsolutions@gmail.com
                    </span>
                    <span style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 600;">
                        <i class="fas fa-phone" style="color: var(--primary);"></i> +91 90256 76853
                    </span>
                </div>
                <div class="top-bar-socials" style="display: flex; gap: 20px;">
                    <a href="https://www.facebook.com/share/19GpqoZY9P/"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/firstflydigitalsolutions/"><i class="fab fa-instagram"></i></a>
                    <a href="https://youtube.com/@firstflydigitalsolutions"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
        <nav class="navbar-new">
            <div class="container">
                <a href="index.html" class="logo-elite">
                    <img src="assets/images/Logo1.png" alt="First Fly Digital" style="height: 70px; transition: 0.3s;">
                </a>
                <div class="nav-links-elite">
                    <a href="index.html" class="${currentPage === 'index.html' || currentPage === '' ? 'active-elite' : ''}">Home</a>
                    <a href="index.html#services">Service</a>
                    <a href="index.html#portfolio">Portfolio</a>
                    <a href="index.html#testimonials">Testimonials</a>
                    <a href="faq.html" class="${currentPage === 'faq.html' ? 'active-elite' : ''}">FAQ</a>
                    <a href="blog.html" class="${currentPage === 'blog.html' ? 'active-elite' : ''}">Blog</a>
                    <a href="about.html" class="${currentPage === 'about.html' ? 'active-elite' : ''}">About</a>
                </div>
                <div class="nav-actions-elite">
                    <a href="contact.html" class="btn btn-primary nav-cta">CONTACT</a>
                    <div class="hamburger" id="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `;

    // ---------- FOOTER ----------
    const footerHTML = `
    <footer class="footer-elite">
        <div class="container">
            <div class="footer-top-section">
                <div class="footer-brand-column">
                    <div class="footer-logo-elite"><img src="assets/images/Logo1.png" alt="First Fly Digital" style="height: 70px;"></div>
                    <p class="footer-mission">Architecting the future of digital engineering. From custom ERP systems to cinematic storytelling, we build the engines of modern business.</p>
                    <div class="footer-social-grid">
                        <a href="https://www.facebook.com/share/19GpqoZY9P/" class="social-glass"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/firstflydigitalsolutions/" class="social-glass"><i class="fab fa-instagram"></i></a>
                        <a href="https://youtube.com/@firstflydigitalsolutions" class="social-glass"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <div class="footer-links-grid">
                    <div class="footer-col">
                        <h4>Engineering</h4>
                        <ul>
                            <li><a href="index.html#services">Software & ERP</a></li>
                            <li><a href="index.html#services">Web Engineering</a></li>
                            <li><a href="index.html#services">Creative Studio</a></li>
                            <li><a href="index.html#services">Marketplace</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Studio</h4>
                        <ul>
                            <li><a href="about.html">Our Story</a></li>
                            <li><a href="portfolio.html">Selected Work</a></li>
                            <li><a href="blog.html">Journal</a></li>
                            <li><a href="faq.html">Common Questions</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Connect</h4>
                        <div class="footer-contact-glass">
                            <p><i class="fas fa-envelope"></i> firstflydigitalsolutions@gmail.com</p>
                            <p><i class="fas fa-phone-alt"></i> +91 90256 76853</p>
                            <a href="contact.html" class="footer-cta-btn">Book A Consultation</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom-elite">
                <div class="copyright-wrap">
                    <p>&copy; 2026 First Fly Digital Solutions. All rights reserved.</p>
                    <div class="legal-links">
                        <a href="privacy.html">Privacy Policy</a>
                        <a href="terms.html">Terms</a>
                    </div>
                </div>
                <div class="scroll-top-label" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                    BACK TO TOP <i class="fas fa-arrow-up"></i>
                </div>
            </div>
        </div>
        <div class="footer-bg-text">FIRST FLY</div>
    </footer>
  `;

    // ---------- FLOATING ELEMENTS ----------
    const floatingHTML = `
    <!-- Floating WhatsApp -->
    <a href="https://wa.me/919025676853?text=Hello%20First%20Fly%20Digital%20Solutions%2C%20I%20need%20a%20website"
        class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
                d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.14 6.738 3.072 9.362L1.062 31.29l6.166-1.98a15.9 15.9 0 008.776 2.634C24.826 31.944 32 24.77 32 16.004 32 7.176 24.826 0 16.004 0zm9.318 22.614c-.39 1.1-2.272 2.1-3.136 2.178-.794.07-1.79.1-2.89-.182a26.36 26.36 0 01-2.616-.968c-4.606-1.99-7.616-6.654-7.848-6.964-.232-.31-1.892-2.516-1.892-4.798s1.196-3.404 1.62-3.868c.424-.464.926-.58 1.234-.58.308 0 .616.002.886.016.284.014.666-.108.942.718.31.856 1.05 2.898 1.126 3.106.078.232.13.502.026.81-.104.31-.156.502-.31.774-.156.272-.328.608-.468.816-.156.232-.318.484-.136.948.182.464.81 1.396 1.74 2.264 1.194 1.114 2.2 1.46 2.512 1.62.312.162.494.136.676-.082.182-.218.78-.91 1.026-1.374.218-.464.464-.382.78-.232.312.15 2.014.95 2.358 1.122.344.172.57.258.654.4.078.14.078.812-.312 1.912z" />
        </svg>
    </a>

    <!-- Scroll to Top -->
    <button class="scroll-top" id="scrollTop" aria-label="Scroll to top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
    </button>

    <!-- Mobile Drawer -->
    <div class="drawer-overlay" id="drawerOverlay"></div>
    <div class="mobile-drawer" id="mobileDrawer">
        <div class="drawer-header">
            <div class="footer-logo-elite"><img src="assets/images/Logo1.png" alt="First Fly Digital" style="height: 50px;"></div>
            <button id="closeDrawer" class="drawer-close"><i class="fas fa-times"></i></button>
        </div>
        <nav class="drawer-nav">
            <a href="index.html">Home</a>
            <a href="index.html#services">Service</a>
            <a href="index.html#portfolio">Portfolio</a>
            <a href="index.html#testimonials">Testimonials</a>
            <a href="faq.html">FAQ</a>
            <a href="blog.html">Blog</a>
            <a href="about.html">About</a>
            <a href="contact.html" class="btn btn-primary drawer-cta">Contact Us</a>
        </nav>
        <div class="drawer-footer">
            <p>Connect with us</p>
            <div class="footer-social-grid">
                <a href="https://www.facebook.com/share/19GpqoZY9P/" class="social-glass"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/firstflydigitalsolutions/" class="social-glass"><i class="fab fa-instagram"></i></a>
                <a href="https://youtube.com/@firstflydigitalsolutions" class="social-glass"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    </div>
  `;

    // ---------- INJECT COMPONENTS ----------
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const floatingPlaceholder = document.getElementById('floating-placeholder');

    // Global Elegant Elements
    const preloaderHTML = `
        <div class="preloader">
            <div class="preloader-content">
                <div class="logo" style="margin-bottom: 20px;"><img src="assets/images/Logo1.png" alt="First Fly Digital" style="height: 80px;"></div>
                <div class="loader-bar"></div>
            </div>
        </div>
    `;
    const cursorHTML = `<div class="custom-cursor"></div>`;
    const grainyHTML = `<div class="grainy-overlay"></div>`;

    document.body.insertAdjacentHTML('afterbegin', preloaderHTML + grainyHTML + cursorHTML);

    if (navPlaceholder) navPlaceholder.innerHTML = headerHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
    if (floatingPlaceholder) floatingPlaceholder.innerHTML = floatingHTML;

    // ---------- SET ACTIVE NAV LINK ----------
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
})();

    // ---------- MOBILE MENU LOGIC ----------
    setTimeout(() => {
        const hamburger = document.getElementById('hamburger');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const drawerOverlay = document.getElementById('drawerOverlay');
        const closeDrawer = document.getElementById('closeDrawer');

        if (hamburger && mobileDrawer && drawerOverlay) {
            hamburger.addEventListener('click', () => {
                mobileDrawer.classList.add('active');
                drawerOverlay.classList.add('active');
            });

            const closeMenu = () => {
                mobileDrawer.classList.remove('active');
                drawerOverlay.classList.remove('active');
            };

            drawerOverlay.addEventListener('click', closeMenu);
            if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
            
            // Close on link click
            mobileDrawer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        }
    }, 100);

