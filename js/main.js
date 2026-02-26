// ==========================================
// SHIVANSH CODEX - EXTREME EDITION
// WebGL + GLSL + Advanced Animations
// ==========================================

// Global Variables
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initWebGL();
  initAnimations();
  initNavigation();
  initProjects();
  initTerminal();
  initMagneticButtons();
  initSmoothScroll();
});

// ==========================================
// LOADER SYSTEM
// ==========================================
function initLoader() {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderBar');
  const text = document.getElementById('loaderText');
  const codeLines = [
    document.getElementById('codeLine1'),
    document.getElementById('codeLine2'),
    document.getElementById('codeLine3')
  ];
  
  const messages = [
    'INITIALIZING SECURE CONNECTION',
    'LOADING SHADER MODULES',
    'ESTABLISHING ENCRYPTED CHANNEL',
    'AUTHENTICATING USER',
    'ACCESS GRANTED'
  ];
  
  const codes = [
    '> import three from "three"',
    '> const security = new Encryption()',
    '> await security.establish()'
  ];
  
  let progressVal = 0;
  let messageIndex = 0;
  
  // Animate progress
  const interval = setInterval(() => {
    progressVal += Math.random() * 15;
    if (progressVal >= 100) {
      progressVal = 100;
      clearInterval(interval);
      
      // Complete loading
      setTimeout(() => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            startEntranceAnimations();
          }
        });
      }, 500);
    }
    
    progress.style.width = progressVal + '%';
    
    // Update message
    if (progressVal > (messageIndex + 1) * 20 && messageIndex < messages.length) {
      text.textContent = messages[messageIndex];
      messageIndex++;
    }
    
    // Update code lines
    codes.forEach((code, i) => {
      if (progressVal > (i + 1) * 30) {
        codeLines[i].textContent = code;
        codeLines[i].style.opacity = '1';
      }
    });
    
  }, 200);
}

// ==========================================
// WEBGL BACKGROUND
// ==========================================
function initWebGL() {
  const canvas = document.getElementById('glCanvas');
  
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;
  
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true, 
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Create particle system
  createParticles();
  
  // Mouse movement
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  
  // Resize handler
  window.addEventListener('resize', onWindowResize, false);
  
  // Start animation loop
  animate();
}

function createParticles() {
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  const color1 = new THREE.Color(0x00ff88);
  const color2 = new THREE.Color(0x00d4ff);
  
  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    
    // Color
    const mixedColor = color1.clone().lerp(color2, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  // Add connecting lines
  createConnections();
}

function createConnections() {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.05
  });
  
  // Create constellation effect
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  
  const positions = particles.geometry.attributes.position.array;
  const particleCount = positions.length / 3;
  
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      if (distance < 10) {
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
  }
  
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.001;
  mouseY = (event.clientY - windowHalfY) * 0.001;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  
  targetX = mouseX * 0.5;
  targetY = mouseY * 0.5;
  
  if (particles) {
    particles.rotation.y += 0.001;
    particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
    particles.rotation.y += (targetX - particles.rotation.y) * 0.05;
  }
  
  renderer.render(scene, camera);
}

// ==========================================
// ENTRANCE ANIMATIONS
// ==========================================
function startEntranceAnimations() {
  // Animate hero title characters
  const chars = document.querySelectorAll('.char');
  chars.forEach((char, i) => {
    gsap.to(char, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      delay: i * 0.05,
      ease: 'power4.out'
    });
  });
  
  // Scramble text effect for subtitle
  scrambleText(document.getElementById('scrambleText'), 'ETHICAL HACKER // FULL STACK DEVELOPER // SYSTEM ARCHITECT');
  
  // Animate hologram
  gsap.from('.hologram-container', {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: 'power3.out'
  });
  
  // Animate hologram rings
  gsap.from('.hologram-ring', {
    scale: 0,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  });
  
  // Typewriter effect for meta text
  typeWriter('metaText', 'ELITE SECURITY RESEARCHER', 50);
  
  // Animate scroll indicator
  gsap.from('.hero-scroll', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 2,
    ease: 'power2.out'
  });
}

// ==========================================
// TEXT EFFECTS
// ==========================================
function scrambleText(element, finalText) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  let iterations = 0;
  const maxIterations = 20;
  
  const interval = setInterval(() => {
    element.textContent = finalText
      .split('')
      .map((char, index) => {
        if (index < iterations / 2) {
          return finalText[index];
        }
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    iterations++;
    if (iterations > maxIterations * 2) {
      clearInterval(interval);
      element.textContent = finalText;
    }
  }, 50);
}

function typeWriter(elementId, text, speed) {
  const element = document.getElementById(elementId);
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  element.textContent = '';
  type();
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navProgress = document.getElementById('navProgress');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll progress
  window.addEventListener('scroll', () => {
    // Nav background
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    navProgress.style.width = scrolled + '%';
    
    // Active section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
  
  // Mobile toggle
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const lines = navToggle.querySelectorAll('.toggle-line');
    if (mobileNav.classList.contains('active')) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      lines[0].style.transform = '';
      lines[1].style.transform = '';
    }
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        mobileNav.classList.remove('active');
      }
    });
  });
}

// ==========================================
// PROJECTS SLIDER
// ==========================================
function initProjects() {
  const track = document.getElementById('projectTrack');
  const cards = document.querySelectorAll('.project-card');
  const prevBtn = document.getElementById('projPrev');
  const nextBtn = document.getElementById('projNext');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  const totalCards = cards.length;
  
  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 40;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  });
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
    });
  });
  
  // Card hover effect with mouse position
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

// ==========================================
// TERMINAL
// ==========================================
function initTerminal() {
  const commands = [
    'whoami',
    'cat skills.txt',
    'nmap -sV target.com',
    'python3 exploit.py --ethical',
    './deploy.sh --secure',
    'echo "Access Granted"'
  ];
  
  const outputs = [
    'shivansh: elite security researcher',
    'Python, JavaScript, WebGL, GLSL, Linux',
    'Scanning... 3 open ports detected',
    'Exploit running in safe mode',
    'Deployment successful',
    'Welcome to the system'
  ];
  
  let cmdIndex = 0;
  const cmdElement = document.getElementById('termCmd');
  const outputElement = document.getElementById('termOutput');
  
  function typeCommand() {
    const cmd = commands[cmdIndex];
    let charIndex = 0;
    
    cmdElement.textContent = '';
    outputElement.textContent = '';
    
    const typeInterval = setInterval(() => {
      if (charIndex < cmd.length) {
        cmdElement.textContent += cmd[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        setTimeout(() => {
          outputElement.textContent = outputs[cmdIndex];
          cmdIndex = (cmdIndex + 1) % commands.length;
          
          setTimeout(typeCommand, 3000);
        }, 500);
      }
    }, 50);
  }
  
  // Start terminal when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeCommand();
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(document.getElementById('terminal'));
}

// ==========================================
// MAGNETIC BUTTONS
// ==========================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ==========================================
// SMOOTH SCROLL (Lenis)
// ==========================================
function initSmoothScroll() {
  // Check if Lenis is available
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
  }
}

// ==========================================
// GSAP SCROLL ANIMATIONS
// ==========================================
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
  
  // Project cards
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Skill nodes
  gsap.utils.toArray('.skill-node').forEach((node, i) => {
    gsap.from(node, {
      scrollTrigger: {
        trigger: node,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.05,
      ease: 'back.out(1.7)'
    });
  });
  
  // Stat bars
  gsap.utils.toArray('.bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      width: width,
      duration: 1.5,
      ease: 'power3.out'
    });
  });
  
  // Intel cards
  gsap.from('.intel-card', {
    scrollTrigger: {
      trigger: '.intel-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });
}

// ==========================================
// HOLOGRAM TILT EFFECT
// ==========================================
const hologram = document.getElementById('hologram');
if (hologram && window.innerWidth > 968) {
  document.addEventListener('mousemove', (e) => {
    const rect = hologram.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    
    hologram.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  
  document.addEventListener('mouseleave', () => {
    hologram.style.transform = '';
  });
}

// ==========================================
// ID SCRAMBLE EFFECT
// ==========================================
const idElement = document.getElementById('idScramble');
if (idElement) {
  setInterval(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let scrambled = '';
    for (let i = 0; i < 7; i++) {
      scrambled += chars[Math.floor(Math.random() * chars.length)];
    }
    idElement.textContent = 'SHIV_' + scrambled;
    
    setTimeout(() => {
      idElement.textContent = 'SHIV_001';
    }, 100);
  }, 3000);
                          }
