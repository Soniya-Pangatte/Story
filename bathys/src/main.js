import './style.css';
import * as THREE from 'three';

// ============================================================
// BATHYS — main.js | Pure Vanilla JS + Three.js Hero
// ============================================================

// === UTILITIES ===
const $ = id => document.getElementById(id);
const isMobile = () => window.innerWidth < 768;

// === DEPTH GAUGE ===
function initDepthGauge() {
  const gauge = $('depth-gauge');
  if (!gauge) return;
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const depth      = Math.round((scrollTop / docHeight) * 11000);
    gauge.textContent = depth.toLocaleString() + 'm';
  }, { passive: true });
}

// === VIGNETTE ===
function initVignette() {
  const v = $('vignette');
  if (!v) return;
  window.addEventListener('scroll', () => {
    const progress  = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const darkness  = Math.min(progress * 0.88, 0.88);
    v.style.background = `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${darkness}) 100%)`;
  }, { passive: true });
}

// === FADE-IN ON SCROLL ===
function initFadeElements() {
  const els = document.querySelectorAll('.fade-element');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-element')];
      const idx      = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 120);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

// === SUNLIGHT COUNTER ===
function initSunlightCounter() {
  const counter  = $('sunlight-counter');
  const section  = document.getElementById('sunlight');
  if (!counter || !section) return;
  let done = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      let n = 0;
      const t = setInterval(() => {
        n += 5;
        counter.textContent = n;
        if (n >= 200) { counter.textContent = 200; clearInterval(t); }
      }, 25);
    }
  }, { threshold: 0.4 }).observe(section);
}

// === PARALLAX ===
function initParallax() {
  const back  = document.querySelector('.kelp-back');
  const front = document.querySelector('.kelp-front');
  if (!back || !front) return;
  window.addEventListener('scroll', () => {
    if (isMobile()) return;
    const y = window.scrollY;
    back.style.transform  = `translateY(${y * 0.18}px)`;
    front.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

// === SONAR PING ===
function initSonar() {
  const btn       = $('sonar-btn');
  const ring      = $('sonar-ring');
  const container = document.querySelector('.sonar-container');
  if (!btn || !ring) return;
  btn.addEventListener('click', () => {
    ring.classList.remove('active');
    void ring.offsetWidth;
    ring.classList.add('active');
    container.classList.add('sonar-active');
    setTimeout(() => {
      ring.classList.remove('active');
      container.classList.remove('sonar-active');
    }, 1800);
  });
}

// === PANORAMA HORIZONTAL SCROLL ===
function initPanorama() {
  const wrapper = $('panorama-wrapper');
  const track   = $('panorama-track');
  if (!wrapper || !track) return;

  let stickyStart = 0, scrollLength = 0, maxShift = 0;

  function calcBounds() {
    if (isMobile()) { track.style.transform = 'none'; return; }
    const section = document.getElementById('twilight');
    const rect    = section.getBoundingClientRect();
    stickyStart   = window.scrollY + rect.top;
    scrollLength  = section.offsetHeight - window.innerHeight;
    maxShift      = track.scrollWidth - window.innerWidth + 160;
  }

  calcBounds();
  window.addEventListener('resize', calcBounds);

  window.addEventListener('scroll', () => {
    if (isMobile()) return;
    const progress = Math.min(Math.max((window.scrollY - stickyStart) / scrollLength, 0), 1);
    track.style.transform = `translateX(${-progress * maxShift}px)`;
  }, { passive: true });
}

// === BIO PARTICLES ===
function initParticles() {
  const container = $('bio-particles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p           = document.createElement('div');
    p.className       = 'bio-particle';
    p.style.left      = Math.random() * 100 + '%';
    p.style.top       = Math.random() * 100 + '%';
    p.style.animationDelay    = (Math.random() * 7) + 's';
    p.style.animationDuration = (4 + Math.random() * 5) + 's';
    container.appendChild(p);
  }
}

// === ANGLERFISH ===
function initAnglerfish() {
  const container = $('anglerfish-container');
  if (!container) return;
  container.addEventListener('click', () => {
    container.classList.add('attack');
    setTimeout(() => container.classList.remove('attack'), 1400);
  });
}

// === ABYSSAL TIMELINE ===
function initTimeline() {
  const marks = document.querySelectorAll('.timeline-mark');
  const obs   = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('lit'); });
  }, { threshold: 0.6 });
  marks.forEach(m => obs.observe(m));
}

// === HADAL TYPING ===
function initHadalTyping() {
  const el      = $('hadal-title');
  const section = document.getElementById('hadal');
  if (!el || !section) return;
  const text  = 'You have reached the Challenger Deep. 11,000 metres. And yet — life.';
  let started = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      let i = 0;
      const t = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) clearInterval(t);
      }, 52);
    }
  }, { threshold: 0.35 }).observe(section);
}

// === RESURFACE ===
function initResurface() {
  const btn = document.querySelector('.resurface-prompt');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// === HERO 3D MODEL (Abstract Deep Sea Sonar Probe) ===
function initHero3D() {
  const container = document.getElementById('surface');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'hero-3d-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  container.insertBefore(canvas, container.firstChild);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Abstract Probe Core - Solid Navy lines against bright blue surface
  const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
  const coreMat = new THREE.MeshBasicMaterial({ 
    color: 0x0a192f, wireframe: true, transparent: true, opacity: 0.35 
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);

  // 2. Inner Dark Mass
  const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0x051020 });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);

  // 3. Sonar Particles (Deep Blue Marine Snow)
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 800;
  const posArray = new Float32Array(particleCount * 3);
  for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.015, color: 0x0044cc, transparent: true, opacity: 0.8, blending: THREE.NormalBlending
  });
  const particlesMesh = new THREE.Points(particlesGeo, particleMat);

  const group = new THREE.Group();
  group.add(coreMesh);
  group.add(innerMesh);
  group.add(particlesMesh);
  
  if (window.innerWidth > 768) {
    group.position.x = 2.5; 
  } else {
    group.position.y = 1.6; 
  }
  scene.add(group);

  let frame;
  const clock = new THREE.Clock();

  function animate() {
    frame = requestAnimationFrame(animate);
    if (window.scrollY > window.innerHeight * 1.5) return; 

    const t = clock.getElapsedTime();
    group.rotation.y = t * 0.1;
    group.rotation.x = Math.sin(t * 0.2) * 0.2;
    coreMesh.rotation.z = t * 0.05;
    particlesMesh.rotation.y = t * -0.05;
    group.position.y += Math.sin(t * 1.5) * 0.002;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth > 768) {
      group.position.x = 2.5;
      group.position.y = 0;
    } else {
      group.position.x = 0;
      group.position.y = 1.6;
    }
  });
}

// === INIT ===
try { initHero3D(); } catch(e) { console.warn('ThreeJS blocked:', e); }
initDepthGauge();
initVignette();
initFadeElements();
initSunlightCounter();
initParallax();
initSonar();
initPanorama();
initParticles();
initAnglerfish();
initTimeline();
initHadalTyping();
initResurface();
