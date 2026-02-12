// Helper: wait until the element exists in DOM
function waitForElement(selector, callback, interval = 100, maxRetries = 50) {
  let retries = 0;
  const timer = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(timer);
      callback(el);
    } else if (retries >= maxRetries) {
      clearInterval(timer);
      console.warn(`[Process] Waiting for ${selector} timed out.`);
    }
    retries++;
  }, interval);
}

function initProcessSection(section) {
  // Canvas Background
  const canvas = section.querySelector(".process-bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const shapes = [];
    const shapeCount = 25;
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 5 + Math.random() * 15,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: 0.2 + Math.random() * 0.5,
      });
    }

    function drawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${shape.alpha})`;
        ctx.fill();
        shape.x += shape.dx;
        shape.y += shape.dy;
        if (shape.x < 0 || shape.x > canvas.width) shape.dx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.dy *= -1;
      });
      requestAnimationFrame(drawShapes);
    }
    drawShapes();
    console.log("[Process] Canvas initialized.");
  } else {
    console.warn("[Process] .process-bg canvas not found!");
  }

  // Timeline Steps
  const steps = section.querySelectorAll(".timeline-step");
  if (steps.length > 0) {
    const visibleSteps = new Set();

    function checkStepsVisibility() {
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const offset = 120;
        if (rect.top < window.innerHeight - offset && !visibleSteps.has(step)) {
          visibleSteps.add(step);
          setTimeout(() => step.classList.add("visible"), index * 150);
        }
      });
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkStepsVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    checkStepsVisibility();
    console.log("[Process] Timeline initialized.");
  } else {
    console.warn("[Process] No .timeline-step elements found!");
  }
}

// Wait for the #process section to exist in the DOM
document.addEventListener("DOMContentLoaded", () => {
  waitForElement("#process", initProcessSection);
});
