document.addEventListener("DOMContentLoaded", function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".btn-filter");
  const accountCards = document.querySelectorAll(".game-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      accountCards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // View toggle functionality
  const viewButtons = document.querySelectorAll(".btn-view");
  const accountGrid = document.querySelector(".account-grid");

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      viewButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const view = button.getAttribute("data-view");
      accountGrid.className = `account-grid ${view}-view`;
    });
  });

  // Price range filter
  const priceRange = document.getElementById("priceRange");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  if (priceRange && minPrice && maxPrice) {
    priceRange.addEventListener("input", (e) => {
      const value = e.target.value;
      maxPrice.value = value;
    });

    minPrice.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      if (value > parseInt(maxPrice.value)) {
        minPrice.value = maxPrice.value;
      }
    });

    maxPrice.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      if (value < parseInt(minPrice.value)) {
        maxPrice.value = minPrice.value;
      }
    });
  }

  // Apply filters button
  const applyFiltersBtn = document.getElementById("applyFilters");
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      // Here you would normally make an API call with the filter parameters
      // For now, we'll just show an alert
      const selectedFilters = {
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
        gameTypes: Array.from(
          document.querySelectorAll('input[type="checkbox"]:checked')
        ).map((cb) => cb.value),
        accountLevel: document.getElementById("accountLevel").value,
        sortBy: document.getElementById("sortBy").value,
      };

      console.log("Applied filters:", selectedFilters);
      // Implement actual filtering logic here
    });
  }

  // Reset filters button
  const resetFiltersBtn = document.getElementById("resetFilters");
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      // Reset all form elements
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));
      document
        .querySelectorAll("select")
        .forEach((select) => (select.selectedIndex = 0));
      if (priceRange) priceRange.value = priceRange.min;
      if (minPrice) minPrice.value = "";
      if (maxPrice) maxPrice.value = "";

      // Show all accounts
      accountCards.forEach((card) => (card.style.display = "block"));

      // Reset filter buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      document.querySelector('[data-filter="all"]').classList.add("active");
    });
  }

  // Search functionality
  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const accountCards = document.querySelectorAll(".premium-account-card");

      accountCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const features = Array.from(
          card.querySelectorAll(".account-features li")
        )
          .map((li) => li.textContent.toLowerCase())
          .join(" ");

        if (title.includes(searchTerm) || features.includes(searchTerm)) {
          card.closest(".col-lg-6").style.display = "block";
        } else {
          card.closest(".col-lg-6").style.display = "none";
        }
      });
    });
  }

  // Initialize tooltips
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach((tooltip) => {
    new bootstrap.Tooltip(tooltip);
  });

  // Handle image lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ("loading" in HTMLImageElement.prototype) {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }
});

// Handle account filtering based on URL parameters
function handleURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameType = urlParams.get("type");

  if (gameType) {
    const filterButton = document.querySelector(`[data-filter="${gameType}"]`);
    if (filterButton) {
      filterButton.click();
    }
  }
}

// Call handleURLParams when the page loads
window.addEventListener("load", handleURLParams);
