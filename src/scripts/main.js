// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: "ease-out",
    once: true,
    offset: 100,
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Login form handling
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // This is just a placeholder - in a real app, you'd handle authentication properly
      console.log("Login attempted with:", email);

      // Show success message (in a real app, you'd verify credentials first)
      alert("Login successful!");

      // Close the modal after login
      const loginModal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      loginModal.hide();
    });
  }

  // Handle lazy loading of images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      lazyLoadObserver.observe(img);
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Create an images directory and placeholder images
function handlePageLoad() {
  console.log("Page loaded successfully");

  // This function could be used to perform any additional initialization
  // after the page has loaded completely
}

window.addEventListener("load", handlePageLoad);
