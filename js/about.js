function initAboutAnimations() {
  const aboutText = document.querySelector(".about-text");
  const aboutImage = document.querySelector(".about-image img");

  function checkAboutText() {
    if (!aboutText) return;
    const rect = aboutText.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      aboutText.classList.add("visible");
    }
  }

  window.addEventListener("scroll", checkAboutText);
  checkAboutText(); // check immediately on load

  // Parallax image
  document.addEventListener("mousemove", e => {
    if (!aboutImage) return;
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;
    aboutImage.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  });

  // Particles
  const canvas = document.getElementById("aboutParticles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139,92,246,0.6)";
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

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Ensure DOM loaded
document.addEventListener("DOMContentLoaded", initAboutAnimations);
