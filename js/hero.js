document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(
    ".hero-eyebrow, .hero-title, .hero-subtitle, .hero-actions, .hero-visual"
  );

  items.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all .9s cubic-bezier(.16,1,.3,1)";

    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 160);
  });
});