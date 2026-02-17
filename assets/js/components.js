/* ============================================
   FIRST FlY Digital Solutions — Shared Components
   Navbar, Footer, WhatsApp Float, Scroll-to-Top
   Single source of truth for all pages.
   ============================================ */

(function () {
    // Detect current page for active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ---------- NAVBAR ----------
    const navbarHTML = `
    <nav class="navbar" id="navbar">
        <div class="container">
            <a href="index.html" class="navbar-logo">
    F <span class="fly">F</span> D<span class="fly"> S</span>
</a>

            <div class="navbar-menu" id="navMenu">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="services.html">Services</a>
                <a href="portfolio.html">Portfolio</a>
                <a href="blog.html">Blog</a>
                <a href="contact.html">Contact</a>
            </div>
            <a href="contact.html" class="btn btn-primary navbar-cta">Start Project</a>
            <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- Mobile Drawer -->
    <div class="drawer-overlay" id="drawerOverlay"></div>
    <div class="mobile-drawer" id="mobileDrawer" role="dialog" aria-label="Mobile navigation" aria-hidden="true">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="services.html">Services</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="blog.html">Blog</a>
        <a href="contact.html">Contact</a>
        <a href="contact.html" class="btn btn-primary" style="margin-top:16px; text-align:center;">Start Project</a>
    </div>
  `;

    // ---------- FOOTER ----------
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-logo">
                        FIRST <span class="fly">FlY</span>Digital
                    </div>
                    <p>FIRST FlY Digital Solutions is a premium digital engineering studio building fast, futuristic, and
                        SEO-optimized static websites.</p>
                    <div class="footer-social">
                        <a href="https://facebook.com/firstflydigital" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg
                                viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg></a>
                        <a href="https://twitter.com/firstflydigital" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg
                                viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg></a>
                        <a href="https://www.youtube.com/@FIRSTFLYDIGITALSOLUTIONS" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg
                                viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg></a>
                        <a href="https://instagram.com/firstflydigital" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg
                                viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <a href="index.html">Home</a>
                    <a href="about.html">About Us</a>
                    <a href="portfolio.html">Portfolio</a>
                    <a href="blog.html">Blog</a>
                    <a href="contact.html">Contact</a>
                </div>
                <div class="footer-col">
                    <h4>Services</h4>
                    <a href="services.html">Website Development</a>
                    <a href="services.html">Graphic Designing</a>
                    <a href="services.html">Video Editing</a>
                    <a href="services.html">SEO &amp; SEM</a>
                    <a href="services.html">Social Media Marketing</a>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    <a href="mailto:hello@firstflydigital.com">hello@firstflydigital.com</a>
                    <a href="tel:+919025676853">+91 9025676853</a>
                    <a href="https://wa.me/919025676853" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 FIRST FlY Digital Solutions. All Rights Reserved.
            </div>
        </div>
    </footer>
  `;

    // ---------- FLOATING ELEMENTS ----------
    const floatingHTML = `
    <!-- Floating WhatsApp -->
    <a href="https://wa.me/919025676853?text=Hello%20Fly%20Digital%20Solution%2C%20I%20need%20a%20website"
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
  `;

    // ---------- INJECT COMPONENTS ----------
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const floatingPlaceholder = document.getElementById('floating-placeholder');

    if (navPlaceholder) navPlaceholder.innerHTML = navbarHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;
    if (floatingPlaceholder) floatingPlaceholder.innerHTML = floatingHTML;

    // ---------- SET ACTIVE NAV LINK ----------
    document.querySelectorAll('.navbar-menu a, .mobile-drawer a:not(.btn)').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
})();
