document.addEventListener("DOMContentLoaded", () => {
  console.log("[CTA] DOM loaded, waiting for CTA...");

  function initCTA() {
    const ctaSection = document.querySelector("#cta");
    const form = document.querySelector("#ctaForm");
    const statusText = document.querySelector("#formStatus");

    if (!ctaSection || !form || !statusText) {
      console.warn("[CTA] CTA not ready yet. Retrying...");
      return false;
    }

    if (typeof emailjs === "undefined") {
      console.error("[CTA] EmailJS SDK not loaded.");
      return true;
    }

    console.log("[CTA] Initializing CTA section...");

    // ✅ INIT EMAILJS
    emailjs.init("dka9opO6njIDBbwml");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      statusText.textContent = "Sending your request...";
      statusText.classList.remove("success", "error");

      // 1️⃣ SEND ADMIN EMAIL
      emailjs
        .sendForm(
          "service_3ajw9uj",      // Service ID
          "template_akuyfze",     // Admin template
          form
        )
        .then(() => {
          // 2️⃣ SEND AUTO-REPLY EMAIL TO CUSTOMER
          return emailjs.sendForm(
            "service_3ajw9uj",      // Same service
            "template_7ud7jp9",  // 👈 Auto-reply template ID
            form
          );
        })
        .then(() => {
          statusText.textContent =
            "Thank you. We will contact you shortly.";
          statusText.classList.add("success");
          form.reset();

          alert(
            "Your message has been sent. A confirmation email has been sent to you."
          );

          console.log("[CTA] Admin email + auto-reply sent.");
        })
        .catch((error) => {
          statusText.textContent =
            "Something went wrong. Please try again.";
          statusText.classList.add("error");

          alert("Failed to send your request. Please try again later.");
          console.error("[CTA] EmailJS error:", error);
        });
    });

    console.log("[CTA] CTA initialized successfully.");
    return true;
  }

  // 🔁 Retry until CTA exists (for dynamic sections)
  const interval = setInterval(() => {
    if (initCTA()) clearInterval(interval);
  }, 300);
});
document.getElementById('currentYear').textContent = new Date().getFullYear();