/* Index Best Sellers Looping */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("landingMenuTrack");

  if (window.innerWidth > 480) {
    let scrollAmount = 0;
    const gap = parseInt(getComputedStyle(track).gap) || 44;

    function loop() {
      scrollAmount -= 0.7;
      track.style.transform = `translate3d(${scrollAmount}px, 0, 0)`;

      const firstCard = track.children[0];
      const cardWidth = firstCard.offsetWidth + gap;

      if (Math.abs(scrollAmount) >= cardWidth) {
        track.appendChild(firstCard);
        scrollAmount += cardWidth;
        track.style.transform = `translate3d(${scrollAmount}px, 0, 0)`;
      }

      requestAnimationFrame(loop);
    }

    loop();
  }
});

/* Testimonials Slider */
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-box");
  let currentIndex = 0;

  function getItemsPerPage() {
    if (window.innerWidth <= 480) return 1;  
    if (window.innerWidth <= 1024) return 3; 
    return 3;                                
  }

  function showTestimonials() {
    const itemsPerPage = getItemsPerPage();
    testimonials.forEach((item, i) => {
      item.classList.remove("active", "slide-next", "slide-prev");
      item.style.display = "none"; 

      if (i >= currentIndex && i < currentIndex + itemsPerPage) {
        item.classList.add("active");
        item.style.display = "block"; 
      }
    });
  }

  window.nextTestimonials = function () {
    const itemsPerPage = getItemsPerPage();
    currentIndex += itemsPerPage;
    if (currentIndex >= testimonials.length) currentIndex = 0;
    showTestimonials();
  };

  window.prevTestimonials = function () {
    const itemsPerPage = getItemsPerPage();
    currentIndex -= itemsPerPage;
    if (currentIndex < 0) currentIndex = testimonials.length - itemsPerPage;
    showTestimonials();
  };

  window.addEventListener("resize", () => {
    currentIndex = 0;
    showTestimonials();
  });

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

// === Contact form handler with EmailJS + Popup + Confetti ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
  const successPopup = document.getElementById("success-popup");
  const errorPopup = document.getElementById("error-popup");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Send using EmailJS
      emailjs.sendForm("service_7efekja", "template_hszffcd", form)
        .then(() => {
          form.reset();
          showPopup(successPopup);

          // 🎉 Confetti
          if (typeof confetti === "function") {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          showPopup(errorPopup);
        });
    });
  }

  // Popup utility
  function showPopup(popup) {
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 3000);
  }
});

