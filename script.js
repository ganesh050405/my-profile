/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


/* =========================================================
   MOBILE NAV TOGGLE
========================================================= */
const toggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when link clicked
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    toggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});


/* =========================================================
   SCROLL REVEAL (ANIMATION TRIGGER)
========================================================= */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =========================================================
   ACTIVE NAV LINK (SCROLL SPY)
========================================================= */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


/* =========================================================
   CONTACT FORM VALIDATION + FEEDBACK
========================================================= */
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fName");
    const email = document.getElementById("fEmail");
    const msg = document.getElementById("fMsg");

    const errName = document.getElementById("errName");
    const errEmail = document.getElementById("errEmail");
    const errMsg = document.getElementById("errMsg");
    const success = document.getElementById("formSuccess");

    let valid = true;

    // reset
    errName.textContent = "";
    errEmail.textContent = "";
    errMsg.textContent = "";
    success.style.display = "none";

    // validation
    if (name.value.trim() === "") {
      errName.textContent = "Enter your name";
      valid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.value.match(emailPattern)) {
      errEmail.textContent = "Enter valid email";
      valid = false;
    }

    if (msg.value.trim().length < 10) {
      errMsg.textContent = "Minimum 10 characters required";
      valid = false;
    }

    // success
    if (valid) {
      success.style.display = "block";
      success.textContent = "Message sent successfully 🚀";

      form.reset();
    }
  });
}


/* =========================================================
   HERO BACKGROUND — CIRCUIT ANIMATION (OPTIMIZED)
========================================================= */
const canvas = document.getElementById("circuitCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let nodes = [];
  const NODE_COUNT = 50;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // init nodes
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,185,40,0.12)";
    ctx.lineWidth = 1;

    nodes.forEach((n, i) => {
      // move
      n.x += n.dx;
      n.y += n.dy;

      // bounce
      if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.dy *= -1;

      // draw node
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb928";
      ctx.fill();

      // connections
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dist = Math.hypot(n.x - m.x, n.y - m.y);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}