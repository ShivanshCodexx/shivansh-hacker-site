// ==========================================
// LOADER
// ==========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    gsap.to('.loader', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.querySelector('.loader').style.display = 'none';
        initAnimations();
      }
    });
  }, 2000);
});

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Hover effect on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// ==========================================
// NAVIGATION
// ==========================================
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('active', menuOpen);
  
  const spans = menuBtn.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
const typewriter = document.getElementById('typewriter');
const text = 'ETHICAL_HACKER • DEVELOPER';
let charIndex = 0;

function type() {
  if (charIndex < text.length) {
    typewriter.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(type, 50 + Math.random() * 50);
  } else {
    setTimeout(() => {
      typewriter.textContent = '';
      charIndex = 0;
      type();
    }, 3000);
  }
}

// ==========================================
// PARTICLE CANVAS
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 25 : 50;
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;
    
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 156, ${p.opacity})`;
    ctx.fill();
    
    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 156, ${0.1 * (1 - distance / 100)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
  
  requestAnimationFrame(animateParticles);
}

// ==========================================
// 3D TILT EFFECT
// ==========================================
const tiltCard = document.getElementById('tiltCard');

if (tiltCard && window.innerWidth > 968) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

// ==========================================
// GSAP ANIMATIONS
// ==========================================
function initAnimations() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Typewriter start
  type();
  
  // Start particles
  resizeCanvas();
  createParticles();
  animateParticles();
  
  // Hero animations
  gsap.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    delay: 0.2
  });
  
  gsap.from('.hero-role', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.4
  });
  
  gsap.from('.hero-desc', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.6
  });
  
  gsap.from('.hero-actions', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.8
  });
  
  gsap.from('.profile-container', {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.4
  });
  
  // Project cards
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Skills
  gsap.utils.toArray('.skill-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.05,
      ease: 'back.out(1.7)'
    });
  });
  
  // About section
  gsap.from('.about-content', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 70%'
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.code-preview', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 70%'
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  // Terminal typing effect
  const terminalText = document.getElementById('terminalText');
  const commands = [
    'whoami',
    'cat skills.txt',
    'sudo apt-get install security',
    'nmap -sV target.com',
    './exploit.sh --ethical'
  ];
  let cmdIndex = 0;
  let charIdx = 0;
  
  function typeTerminal() {
    if (charIdx < commands[cmdIndex].length) {
      terminalText.textContent += commands[cmdIndex].charAt(charIdx);
      charIdx++;
      setTimeout(typeTerminal, 50);
    } else {
      setTimeout(() => {
        terminalText.textContent = '';
        charIdx = 0;
        cmdIndex = (cmdIndex + 1) % commands.length;
        typeTerminal();
      }, 2000);
    }
  }
  
  // Start terminal when in view
  ScrollTrigger.create({
    trigger: '.terminal-block',
    start: 'top 80%',
    onEnter: () => typeTerminal(),
    once: true
  });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// RESIZE HANDLER
// ==========================================
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
