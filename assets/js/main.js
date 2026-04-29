/* ============================================
   FIRST FlY Digital Solutions — Main JavaScript
   Navbar, Mobile Menu, Scroll-Top, WhatsApp,
   Form Validation, Testimonials, FAQ
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const mainHeader = document.querySelector('.main-header');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header scroll state
    if (scrollY > 60) {
      mainHeader?.classList.add('scrolled');
    } else {
      mainHeader?.classList.remove('scrolled');
    }

    // Scroll-to-top visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  // Scroll-to-top click
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Smooth Scrolling for Anchor Links ----------
  document.querySelectorAll('a[href^="#"], a[href*="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const targetId = href.includes('#') ? href.split('#')[1] : null;
      const targetElement = targetId ? document.getElementById(targetId) : null;

      if (targetElement) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ---------- Mobile Hamburger Menu ----------
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');

  function toggleDrawer() {
    if (!hamburger || !mobileDrawer) return;
    
    hamburger.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    drawerOverlay.classList.toggle('active');
    
    const isOpen = mobileDrawer.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburger) hamburger.addEventListener('click', toggleDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', toggleDrawer);
  if (closeDrawer) closeDrawer.addEventListener('click', toggleDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', toggleDrawer);
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleDrawer();
      }
    });
  });

  // ---------- Button Ripple Effect ----------
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ---------- Testimonials Auto-Slide ----------
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonials-dots .dot');
  let currentSlide = 0;
  let totalSlides = dots.length;
  let slideInterval;

  function goToSlide(index) {
    if (!track || totalSlides === 0) return;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  if (track && totalSlides > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetInterval();
      });
    });

    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  // ---------- FAQ Accordion & Filtering ----------
  const faqTabs = document.querySelectorAll('.faq-tab');
  const faqItemsModern = document.querySelectorAll('.faq-item-modern');
  
  // Tab Switching Logic
  faqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCat = tab.getAttribute('data-category');
      
      // Update active tab
      faqTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter items
      faqItemsModern.forEach(item => {
        if (item.getAttribute('data-faq-cat') === targetCat) {
          item.style.display = 'block';
          // Trigger a small reveal animation if desired
          item.classList.add('reveal-blur'); 
        } else {
          item.style.display = 'none';
          item.classList.remove("faq-open"); // Close if active
        }
      });
    });
  });

  // Accordion Logic
  faqItemsModern.forEach(item => {
    const question = item.querySelector('.faq-trigger-modern');
    if (question) {
      question.addEventListener('click', () => {
        // Close all other items in the CURRENT visible category
        faqItemsModern.forEach(otherItem => {
          if (otherItem !== item && otherItem.style.display !== 'none') {
            otherItem.classList.remove("faq-open");
            const otherBtn = otherItem.querySelector('.faq-trigger-modern');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current item
        const isNowActive = item.classList.toggle("faq-open");
        question.setAttribute('aria-expanded', isNowActive ? 'true' : 'false');
      });
    }
  });

  // ---------- Contact Form Validation & Submission ----------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const subject = contactForm.querySelector('[name="subject"]');
      const message = contactForm.querySelector('[name="message"]');

      // Validation
      if (!name || name.value.trim() === '') {
        name?.parentElement.classList.add('error');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        email?.parentElement.classList.add('error');
        isValid = false;
      }

      if (!message || message.value.trim() === '') {
        message?.parentElement.classList.add('error');
        isValid = false;
      }

      if (isValid) {
        // Logic: Redirect to WhatsApp with message
        const waMessage = encodeURIComponent(
          `Hello First Fly Digital Solutions!\n\n` +
          `Name: ${name.value}\n` +
          `Email: ${email.value}\n` +
          `Subject: ${subject ? subject.value : 'General Inquiry'}\n` +
          `Message: ${message.value}`
        );
        
        window.open(`https://wa.me/919025676853?text=${waMessage}`, '_blank');

        // Optional: Also submit via Formspree if a real ID is provided later
        // contactForm.submit(); 

        contactForm.reset();
        
        // Show Success Bar
        const successBar = document.createElement('div');
        successBar.className = 'form-success-bar';
        successBar.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>Success! Redirecting to WhatsApp...</span>
            </div>
            <div class="success-progress"></div>
        `;
        document.body.appendChild(successBar);
        
        setTimeout(() => successBar.classList.add('show'), 10);
        setTimeout(() => {
            successBar.classList.remove('show');
            setTimeout(() => successBar.remove(), 500);
        }, 4000);
      }
    });
  }

});
