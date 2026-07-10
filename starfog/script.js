const canvas = document.querySelector('#space');
const ctx = canvas.getContext('2d');
let stars = [];
let mist = [];
let width = 0;
let height = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = Array.from({ length: Math.floor((width * height) / 9000) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.15 + 0.15,
    a: Math.random() * 0.75 + 0.15,
    s: Math.random() * 0.08 + 0.015
  }));

  mist = Array.from({ length: 7 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 220 + 140,
    vx: Math.random() * 0.09 + 0.025,
    a: Math.random() * 0.026 + 0.012
  }));
}

function drawSpace() {
  ctx.clearRect(0, 0, width, height);

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, '#050708');
  grad.addColorStop(1, '#0a0c0d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {
    star.y += star.s;
    if (star.y > height) star.y = 0;
    ctx.beginPath();
    ctx.arc(star.x + (mouse.x - width / 2) * 0.0015, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(225, 228, 220, ${star.a})`;
    ctx.fill();
  });

  mist.forEach(cloud => {
    cloud.x += cloud.vx;
    if (cloud.x - cloud.r > width) cloud.x = -cloud.r;
    const g = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.r);
    g.addColorStop(0, `rgba(170, 178, 173, ${cloud.a})`);
    g.addColorStop(1, 'rgba(170, 178, 173, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawSpace);
}

resizeCanvas();
drawSpace();
window.addEventListener('resize', resizeCanvas);

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-card').forEach(el => revealObserver.observe(el));

// Лёгкий наклон карточек на настольных устройствах.
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    });
  });
}

// Магнитный эффект кнопок.
document.querySelectorAll('.magnetic').forEach(button => {
  button.addEventListener('pointermove', event => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  button.addEventListener('pointerleave', () => button.style.transform = 'translate(0,0)');
});

document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' }));
});

const detail = document.querySelector('.archive-detail');
document.querySelectorAll('.archive-row').forEach(row => {
  row.addEventListener('click', () => {
    const active = row.classList.contains('active');
    document.querySelectorAll('.archive-row').forEach(item => item.classList.remove('active'));
    if (active) {
      detail.textContent = 'Выберите запись, чтобы расшифровать фрагмент.';
      return;
    }
    row.classList.add('active');
    detail.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: .75, transform: 'translateY(0)' }], { duration: 320, easing: 'ease-out' });
    detail.textContent = row.dataset.detail;
  });
});

// Атмосферный гул создаётся прямо в браузере через Web Audio API.
const soundButton = document.querySelector('.sound-toggle');
let audioContext;
let masterGain;
let oscillators = [];

function startAmbient() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.045;
  masterGain.connect(audioContext.destination);

  [43.65, 65.41, 87.31].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = index === 0 ? 'sine' : 'triangle';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.25 / (index + 1);
    oscillator.connect(gain).connect(masterGain);
    oscillator.start();
    oscillators.push(oscillator);
  });

  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();
  lfo.frequency.value = 0.12;
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain).connect(masterGain.gain);
  lfo.start();
  oscillators.push(lfo);
}

function stopAmbient() {
  oscillators.forEach(osc => {
    try { osc.stop(); } catch (_) {}
  });
  oscillators = [];
  if (masterGain) masterGain.disconnect();
}

soundButton.addEventListener('click', async () => {
  const enabled = soundButton.getAttribute('aria-pressed') === 'true';
  if (enabled) {
    stopAmbient();
    soundButton.setAttribute('aria-pressed', 'false');
    soundButton.querySelector('.sound-label').textContent = 'Звук выкл.';
  } else {
    startAmbient();
    if (audioContext.state === 'suspended') await audioContext.resume();
    soundButton.setAttribute('aria-pressed', 'true');
    soundButton.querySelector('.sound-label').textContent = 'Звук вкл.';
  }
});

// Параллакс героя.
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const visual = document.querySelector('.hero-visual');
  if (visual && y < window.innerHeight) {
    visual.style.transform = `translateY(${y * 0.06}px)`;
  }
}, { passive: true });
