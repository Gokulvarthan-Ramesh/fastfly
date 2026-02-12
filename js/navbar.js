// ==========================
// Navbar scroll effect
// ==========================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 40);
});
