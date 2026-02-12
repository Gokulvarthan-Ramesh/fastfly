document.addEventListener("DOMContentLoaded", () => {
  const portfolioSection = document.querySelector("#portfolio");

  // Function to initialize portfolio items
  function initPortfolioItems(section) {
    const items = section.querySelectorAll(".portfolio-item");
    console.log("[Portfolio] Found items:", items.length);

    if (items.length === 0) {
      console.warn("[Portfolio] No portfolio items found. Check HTML.");
      return;
    }

    // Click on item opens the link
    items.forEach(item => {
      item.addEventListener("click", () => {
        const link = item.querySelector(".btn-view")?.getAttribute("href");
        if (link && link !== "#") {
          window.open(link, "_blank");
        }
      });

      // Video hover preview
      const video = item.querySelector("video");
      if (video) {
        item.addEventListener("mouseenter", () => video.play());
        item.addEventListener("mouseleave", () => video.pause());
      }
    });

    // Category filtering
    const filterBtns = section.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-filter");

        // Toggle active class
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        items.forEach(item => {
          if (category === "all" || item.dataset.category === category) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });

    console.log("[Portfolio] Portfolio section initialized.");
  }

  // Load HTML dynamically if empty
  if (!portfolioSection || portfolioSection.innerHTML.trim() === "") {
    fetch("sections/portfolio.html")
      .then(res => res.text())
      .then(html => {
        portfolioSection.innerHTML = html;
        initPortfolioItems(portfolioSection);
      })
      .catch(err => console.error("[Portfolio] Failed to load portfolio.html:", err));
  } else {
    initPortfolioItems(portfolioSection);
  }
});
