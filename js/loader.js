// ==========================
// Load HTML Sections
// ==========================
function loadSection(id, file, callback) {
  fetch(`sections/${file}`)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById(id);
      if (!container) return;
      container.innerHTML = html;
      if (callback) callback();
    });
}

// Load sections
loadSection("navbar", "navbar.html");
loadSection("hero", "hero.html");
loadSection("trust", "trust.html");
loadSection("about", "about.html", () => {
  if (window.initAboutAnimations) initAboutAnimations();
});
loadSection("services", "services.html");
loadSection("process", "process.html");
loadSection("cta", "cta.html");
loadSection("footer", "footer.html");
