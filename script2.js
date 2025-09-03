/* Index Best Sellers Looping */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("landingMenuTrack");
  let scrollAmount = 0;
  const gap = parseInt(getComputedStyle(track).gap) || 44;

  function loop() {
    scrollAmount -= 0.7;
    track.style.transform = `translate3d(${scrollAmount}px, 0, 0)`;

    const firstCard = track.children[0];
    const cardWidth = firstCard.offsetWidth + gap;

    // check BEFORE the gap shows
    if (Math.abs(scrollAmount) >= cardWidth) {
      track.appendChild(firstCard);

      scrollAmount += cardWidth;

      track.style.transform = `translate3d(${scrollAmount}px, 0, 0)`;
    }

    requestAnimationFrame(loop);
  }

  loop();
});

/* Testimonials Slider */
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-box");
  const itemsPerPage = 3;
  let currentIndex = 0;
  let direction = "next"; // keep track of slide direction

  function showTestimonials() {
    testimonials.forEach((item, i) => {
      item.classList.remove("active", "slide-next", "slide-prev");
      if (i >= currentIndex && i < currentIndex + itemsPerPage) {
        item.classList.add("active", direction === "next" ? "slide-next" : "slide-prev");
      }
    });
  }

  // Next
  window.nextTestimonials = function () {
    direction = "next";
    currentIndex += itemsPerPage;
    if (currentIndex >= testimonials.length) currentIndex = 0;
    showTestimonials();
  };

  // Prev
  window.prevTestimonials = function () {
    direction = "prev";
    currentIndex -= itemsPerPage;
    if (currentIndex < 0) currentIndex = testimonials.length - itemsPerPage;
    showTestimonials();
  };

  // Init
  showTestimonials();
});


/* Landing Hero Text Switch */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".landing-hero");
  const dynamicWord = document.getElementById("hero-word");

  const images = [
    "url('assets/images/hero1.jpg')",
    "url('assets/images/hero2.png')",
    "url('assets/images/hero3.jpg')",
    "url('assets/images/hero4.png')",
  ];

  const words = ["Pastries", "Baker", "Bread", "Sharing"];

  let index = 1;

  function changeHero() {
    dynamicWord.classList.add("fade-out");

    setTimeout(() => {
      hero.style.backgroundImage = images[index];
      dynamicWord.textContent = words[index];

      dynamicWord.classList.remove("fade-out");
      dynamicWord.classList.add("fade-in");

      setTimeout(() => {
        dynamicWord.classList.remove("fade-in");
      }, 1000);

      index = (index + 1) % images.length;
    }, 1000);
  }

  changeHero();
  setInterval(changeHero, 3500);
});

/* Endless Section Divider Marquee */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("marquee-track");
  if (!track) return; // 🔥 prevent error if element is missing

  const content = track.innerHTML;
  track.innerHTML = content + content + content; // triple it

  let pos = 0;
  const speed = 0.7;

  function animate() {
    pos -= speed;
    if (Math.abs(pos) >= track.scrollWidth / 3) {
      pos = 0;
    }
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});


// === FAQ Accordion ===
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other FAQs
      faqItems.forEach(faq => {
        if (faq !== item) {
          faq.classList.remove("active");
        }
      });

      // Toggle current FAQ
      item.classList.toggle("active");
    });
  });
});

// Contact form handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); 

      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();
      const message = form.querySelector("textarea[name='message']").value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields before submitting.");
        return;
      }

      console.log("Form submitted:", { name, email, message });

      alert("🎉 Thank you, " + name + "! Your message has been sent.");

      form.reset();

      if (typeof confetti === "function") {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    });
  }
});



