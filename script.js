// ============================================
// BALINESE VILA - PROFESSIONAL SCRIPT
// ============================================

console.log(
  "%c🌴 Balinese Vila Resort & Spa 🌴",
  "font-size: 20px; color: #10b981; font-weight: bold;",
);
console.log(
  "%cWelcome to Luxury Experience",
  "font-size: 14px; color: #059669;",
);

// ===== PAGE LOAD ANIMATIONS =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Page loaded - Initializing animations...");

  // Animate all elements with fade-in classes on page load
  animateOnPageLoad();

  // Initialize stagger animations for cards
  initializeStaggerAnimations();

  // Initialize intersection observer for scroll animations
  initializeScrollAnimations();

  // Set minimum dates for date inputs
  setMinimumDates();

  console.log("✅ All animations initialized!");
});

// ===== FUNCTION: ANIMATE ON PAGE LOAD =====
function animateOnPageLoad() {
  const fadeInElements = document.querySelectorAll('[class*="animate-fade"]');

  fadeInElements.forEach((element, index) => {
    element.style.animationPlayState = "running";
  });
}

// ===== FUNCTION: INITIALIZE STAGGER ANIMATIONS =====
function initializeStaggerAnimations() {
  const staggerItems = document.querySelectorAll(".stagger-item");

  staggerItems.forEach((item, index) => {
    // Remove opacity 0 to show animation
    item.style.opacity = "1";
  });

  console.log(`✅ Initialized ${staggerItems.length} stagger items`);
}

// ===== FUNCTION: INTERSECTION OBSERVER FOR SCROLL =====
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation class when element enters viewport
        if (entry.target.classList.contains("stagger-item")) {
          entry.target.style.opacity = "1";
        }

        // Add glow animation to cards
        if (entry.target.classList.contains("luxury-card")) {
          entry.target.style.animation = "slideUp 0.6s ease-out forwards";
        }
      }
    });
  }, observerOptions);

  // Observe all elements that need scroll animations
  document
    .querySelectorAll(
      ".stagger-item, .luxury-card, .gallery-item, .testimonial-card, .trust-badge",
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// ===== FUNCTION: SET MINIMUM DATES =====
function setMinimumDates() {
  const today = new Date().toISOString().split("T")[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach((input) => {
    input.setAttribute("min", today);
  });
}

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Highlight target element briefly
      highlightElement(target);
    }
  });
});

// ===== FUNCTION: HIGHLIGHT ELEMENT =====
function highlightElement(element) {
  element.style.animation = "pulse-glow 0.6s ease-out";
  setTimeout(() => {
    element.style.animation = "none";
  }, 600);
}

// ===== BUTTON HOVER EFFECTS =====
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });

  button.addEventListener("click", function (e) {
    // Ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.position = "absolute";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.background = "rgba(255, 255, 255, 0.6)";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple 0.6s ease-out";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== CARD HOVER ANIMATIONS =====
document.querySelectorAll(".luxury-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-12px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ===== GALLERY IMAGE HOVER =====
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const img = this.querySelector("img");
    if (img) {
      img.style.filter = "brightness(1.1) saturate(1.2)";
    }
  });

  item.addEventListener("mouseleave", function () {
    const img = this.querySelector("img");
    if (img) {
      img.style.filter = "brightness(1) saturate(1)";
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
  }
});

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  // Parallax untuk hero image
  const heroImage = document.querySelector(".animate-fade-in-right");
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrollTop * 0.3}px)`;
  }
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== MOBILE MENU =====
const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector("nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("expanded");
  });
}

// ===== WHATSAPP BUTTON ANIMATION =====
const whatsappBtn = document.querySelector(".whatsapp-float");
if (whatsappBtn) {
  whatsappBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.15) translateY(-5px)";
  });

  whatsappBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
  });

  whatsappBtn.addEventListener("click", function () {
    this.style.animation = "float 0.6s ease-out";
  });
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
  const button = document.createElement("a");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.href = "#";
  button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 49;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        text-decoration: none;
        font-size: 20px;
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = "1";
      button.style.visibility = "visible";
      button.style.transform = "translateY(0)";
    } else {
      button.style.opacity = "0";
      button.style.visibility = "hidden";
      button.style.transform = "translateY(20px)";
    }
  });

  button.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Create scroll to top button on page load
document.addEventListener("DOMContentLoaded", () => {
  createScrollToTopButton();
});

// ===== FORM HANDLING (If needed) =====
const bookingForm = document.querySelector("form");
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Booking form submitted");
  });
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener("load", () => {
  const performanceData = {
    loadTime: performance.now(),
    resourceCount: performance.getEntriesByType("resource").length,
  };

  console.log("%cPerformance Stats:", "color: #059669; font-weight: bold;");
  console.log(`Page Load Time: ${performanceData.loadTime.toFixed(2)}ms`);
  console.log(`Resources Loaded: ${performanceData.resourceCount}`);
});

// ===== INTERSECTION OBSERVER FOR LAZY LOADING IMAGES =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  // Escape key to close any open menus
  if (e.key === "Escape") {
    const navbar = document.querySelector("nav");
    if (navbar && navbar.classList.contains("expanded")) {
      navbar.classList.remove("expanded");
    }
  }

  // Enter key on buttons
  if (e.key === "Enter" && e.target.matches("button")) {
    e.target.click();
  }
});

// ===== PRINT WELCOME MESSAGE =====
console.log(
  "%c✨ Selamat datang di Balinese Vila ✨",
  "font-size: 16px; color: #10b981; font-weight: bold;",
);
console.log(
  "%cLihat keindahan, rasakan kemewahan!",
  "font-size: 13px; color: #059669;",
);
console.log(
  "%c📍 Ubud, Bali | 🌟 Rating 4.9/5 | 👥 250+ Happy Guests",
  "font-size: 12px; color: #666;",
);
