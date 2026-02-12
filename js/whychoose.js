document.addEventListener("DOMContentLoaded", () => {
  const whyChooseSection = document.querySelector("#why-choose");

  if (!whyChooseSection) {
    console.warn("[WhyChoose] #why-choose section not found");
    return;
  }

  function initWhyChoose(section) {
    const cards = section.querySelectorAll(".feature-card");
    console.log("[WhyChoose] Found cards:", cards.length);

    if (!cards.length) {
      console.warn("[WhyChoose] No feature cards found. Check HTML.");
      return;
    }

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    /* =========================
       INTERACTIONS
    ========================== */

    cards.forEach(card => {
      // Desktop hover only
      if (!isTouchDevice) {
        card.addEventListener("mouseenter", () => {
          card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
          card.classList.remove("active");
        });
      }

      // Mobile / touch click toggle
      card.addEventListener("click", () => {
        if (!isTouchDevice) return;

        cards.forEach(c => {
          if (c !== card) c.classList.remove("active");
        });

        card.classList.toggle("active");
      });
    });

    /* =========================
       SCROLL REVEAL
    ========================== */

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // reveal once
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    cards.forEach(card => observer.observe(card));

    console.log("[WhyChoose] Section initialized successfully.");
  }

  /* =========================
     INIT / DYNAMIC LOAD
  ========================== */

  const hasContent =
    whyChooseSection.children.length > 0 &&
    whyChooseSection.textContent.trim().length > 0;

  if (!hasContent) {
    fetch("sections/whychoose.html")
      .then(res => {
        if (!res.ok) throw new Error("HTTP error");
        return res.text();
      })
      .then(html => {
        whyChooseSection.innerHTML = html;
        initWhyChoose(whyChooseSection);
      })
      .catch(err =>
        console.error("[WhyChoose] Failed to load why-choose.html:", err)
      );
  } else {
    initWhyChoose(whyChooseSection);
  }
});
