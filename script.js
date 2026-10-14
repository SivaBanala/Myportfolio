
// Your email address
const portfolioEmail = "sivanjaneyabanala@gmail.com";

// 1. Typing animation
const typingElement = document.getElementById("typing-text");

const roles = [
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "Python Developer",
  "AI Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function typeRole() {
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    characterIndex++;
    typingElement.textContent = currentRole.slice(0, characterIndex);

    if (characterIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1500);
      return;
    }
  } else {
    characterIndex--;
    typingElement.textContent = currentRole.slice(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 85);
}

if (typingElement && !reducedMotion) {
  typeRole();
}

// 2. Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

// 3. Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// 4. Highlight active navigation link
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;

        navigationLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${sectionId}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// 5. Project category filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );

  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// 6. Contact form
// Opens the visitor's email application.
// The visitor must press Send in that application.

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const senderEmail = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${senderEmail}\n\n` +
      `Message:\n${message}`
    );

    formStatus.textContent =
      "Opening your email application. Press Send there to deliver your message.";

    const mailtoLink =
      `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  });
}

// 7. Automatic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
