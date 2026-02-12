function initServicesAnimations() {
  console.log("[Services] DOMContentLoaded fired.");
  console.log("[Services] Initializing services animations...");

  // Retry until both .services and .service-card exist
  function waitForServices(retryCount = 0) {
    const servicesSection = document.querySelector(".services");
    const serviceCards = servicesSection ? servicesSection.querySelectorAll(".service-card") : [];

    if (!servicesSection) {
      console.warn(`[Services] Waiting for .services section... Retry #${retryCount + 1}`);
      if (retryCount < 50) setTimeout(() => waitForServices(retryCount + 1), 100);
      return;
    }

    if (serviceCards.length === 0) {
      console.warn(`[Services] Found .services but no .service-card yet. Retry #${retryCount + 1}`);
      if (retryCount < 50) setTimeout(() => waitForServices(retryCount + 1), 100);
      return;
    }

    console.log(`[Services] .services section found!`);
    console.log(`[Services] Found ${serviceCards.length} service cards.`);

    // ================================
    // 1️⃣ Fade-in on scroll
    // ================================
    function checkCardsVisibility() {
      serviceCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", checkCardsVisibility);
    checkCardsVisibility();

    // ================================
    // 2️⃣ Hover parallax for icons
    // ================================
    serviceCards.forEach((card) => {
      const icon = card.querySelector(".service-icon");
      if (!icon) return;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        icon.style.transform = `translate(${x}px, ${y}px) rotate(10deg) scale(1.2)`;
      });

      card.addEventListener("mouseleave", () => {
        icon.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
      });
    });

    console.log("[Services] Hover parallax setup completed.");

    // ================================
    // 3️⃣ Particle effect behind cards
    // ================================
    let canvas = servicesSection.querySelector(".services-particles");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.classList.add("services-particles");
      servicesSection.prepend(canvas);
      console.log("[Services] Canvas for particles created and prepended.");
    }

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
      console.log(`[Services] Canvas resized to ${canvas.width}x${canvas.height}`);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.2)";
        ctx.fill();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        this.draw();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());
    console.log("[Services] 80 particles created for background animation.");

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
    console.log("[Services] Particle animation started.");
  }

  waitForServices();
}

// Initialize safely
document.addEventListener("DOMContentLoaded", initServicesAnimations);
