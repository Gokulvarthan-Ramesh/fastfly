/* ============================================
   FIRST FlYDigital Solution — Main JavaScript
   Navbar, Mobile Menu, Scroll-Top, WhatsApp,
   Form Validation, Testimonials, FAQ
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
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

  // ---------- Mobile Hamburger Menu ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');

  function toggleDrawer() {
    hamburger.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    drawerOverlay.classList.toggle('active');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleDrawer);
  }
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

  // ---------- FAQ Accordion ----------
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ---------- Contact Form Validation ----------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

      // Name
      const name = contactForm.querySelector('[name="name"]');
      if (name && name.value.trim() === '') {
        name.closest('.form-group').classList.add('error');
        isValid = false;
      }

      // Email
      const email = contactForm.querySelector('[name="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value.trim())) {
        email.closest('.form-group').classList.add('error');
        isValid = false;
      }

      // Phone
      const phone = contactForm.querySelector('[name="phone"]');
      if (phone && phone.value.trim() === '') {
        phone.closest('.form-group').classList.add('error');
        isValid = false;
      }

      // Service
      const service = contactForm.querySelector('[name="service"]');
      if (service && service.value === '') {
        service.closest('.form-group').classList.add('error');
        isValid = false;
      }

      // Message
      const message = contactForm.querySelector('[name="message"]');
      if (message && message.value.trim() === '') {
        message.closest('.form-group').classList.add('error');
        isValid = false;
      }

      if (isValid) {
        // Build WhatsApp message
        const waMessage = encodeURIComponent(
          `Hello FIRST FlYDigital Solution!\n\nName: ${name.value}\nEmail: ${email.value}\nPhone: ${phone.value}\nService: ${service.options[service.selectedIndex].text}\nMessage: ${message.value}`
        );
        window.open(`https://wa.me/919025676853?text=${waMessage}`, '_blank');

        // Reset form
        contactForm.reset();
      }
    });
  }

});
