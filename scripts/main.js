/* ═══════════════════════════════════════════════════════════
   WEDDING INVITATION — MAIN SCRIPT
   Siva Ram & Sri Harshita
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── LOADER ─────────────────────────────────────────────── */
(function initLoader() {
  const loader   = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  
  if (!loader || !progress) return;

  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 5;
    if (pct >= 100) {
      pct = 100;
      clearInterval(interval);
      progress.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        // Trigger hero reveals after loader exits
        triggerHeroReveals();
      }, 400);
    }
    progress.style.width = pct + '%';
  }, 90);

  // Fallback — always remove loader
  setTimeout(() => {
    clearInterval(interval);
    loader.classList.add('hidden');
    triggerHeroReveals();
  }, 3200);
})();


/* ─── HERO REVEALS ───────────────────────────────────────── */
function triggerHeroReveals() {
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });
}


/* ─── SCROLL REVEAL ──────────────────────────────────────── */
(function initScrollReveal() {
  // Exclude hero reveals (handled separately after loader)
  const targets = document.querySelectorAll(
    '.section .reveal, .section .reveal-up, .section .reveal-left, .section .reveal-right, .footer .reveal-up'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ─── COUNTDOWN TIMER ────────────────────────────────────── */
(function initCountdown() {
  // Wedding date: April 1, 2026 at 2:26 PM IST
  const WEDDING_DATE = new Date("2026-04-02T02:23:00+05:30");

  const $days    = document.getElementById('days');
  const $hours   = document.getElementById('hours');
  const $minutes = document.getElementById('minutes');
  const $seconds = document.getElementById('seconds');
  const $grid    = document.getElementById('countdownGrid');
  const $married = document.getElementById('marriedMsg');

  if (!$days) return;

  // Store previous values for flip animation
  let prev = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function setWithFlip(el, id, value) {
    const str = pad(value);
    if (prev[id] !== str) {
      el.classList.remove('flip');
      // Force reflow
      void el.offsetWidth;
      el.classList.add('flip');
      el.textContent = str;
      prev[id] = str;
    }
  }

  function tick() {
    const now  = Date.now();
    const diff = WEDDING_DATE.getTime() - now;

    if (diff <= 0) {
      // Wedding has happened
      if ($grid) $grid.style.display = 'none';
      if ($married) {
        $married.style.display = 'block';
        launchConfetti();
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    setWithFlip($days,    'days',    d);
    setWithFlip($hours,   'hours',   h);
    setWithFlip($minutes, 'minutes', m);
    setWithFlip($seconds, 'seconds', s);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ─── CONFETTI ───────────────────────────────────────────── */
function launchConfetti() {
  const wrap = document.getElementById('confettiWrap');
  if (!wrap) return;

  const colors = ['#C9952A', '#E8C36A', '#8B1A1A', '#F5E6C0', '#FF6B6B', '#FFF'];
  const count  = 80;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      left: ${Math.random() * 100}%;
      top: 0;
      animation: confettiFall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    wrap.appendChild(el);
  }

  // Inject keyframes dynamically
  if (!document.getElementById('confettiStyle')) {
    const style = document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = `
      #confettiWrap {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }
      @keyframes confettiFall {
        0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}


/* ─── AUDIO PLAYER ───────────────────────────────────────── */
(function initAudio() {
  const btn    = document.getElementById('audioBtn');
  const audio  = document.getElementById('bgAudio');
  const waves  = document.getElementById('audioWaves');
  const icon   = document.getElementById('audioIcon');

  if (!btn || !audio) return;

  let playing = false;

  function setPlaying(state) {
    playing = state;
    if (state) {
      audio.play().catch(() => {});
      waves.classList.add('playing');
      icon.textContent = '♬';
      btn.setAttribute('aria-label', 'Pause music');
    } else {
      audio.pause();
      waves.classList.remove('playing');
      icon.textContent = '♪';
      btn.setAttribute('aria-label', 'Play music');
    }
  }

  btn.addEventListener('click', () => setPlaying(!playing));

  // Auto-play after first user interaction on the page
  const autoPlay = () => {
    if (!playing) setPlaying(true);
    document.removeEventListener('click', autoPlay);
    document.removeEventListener('scroll', autoPlay);
    document.removeEventListener('touchstart', autoPlay);
  };

  document.addEventListener('click',      autoPlay, { once: true });
  document.addEventListener('scroll',     autoPlay, { once: true });
  document.addEventListener('touchstart', autoPlay, { once: true });

  // Fade in/out audio
  audio.volume = 0;
  audio.addEventListener('play', () => {
    let v = 0;
    const fade = setInterval(() => {
      v = Math.min(v + 0.03, 0.45);
      audio.volume = v;
      if (v >= 0.45) clearInterval(fade);
    }, 80);
  });
})();


/* ─── PARALLAX ON HERO ───────────────────────────────────── */
(function initParallax() {
  const hero     = document.getElementById('hero');
  const vinayaka = document.querySelector('.vinayaka-img');
  const names    = document.querySelector('.names-block');

  if (!hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          if (vinayaka) vinayaka.style.transform = `translateY(${scrollY * 0.15}px)`;
          if (names)    names.style.transform    = `translateY(${scrollY * 0.08}px)`;
          if (hero)     hero.style.opacity       = 1 - scrollY / (window.innerHeight * 0.9);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─── SMOOTH SECTION TRANSITIONS (intersection highlight) ── */
(function initSectionHighlight() {
  const sections = document.querySelectorAll('.section');
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(s => obs.observe(s));
})();


/* ─── CURSOR SPARKLE (desktop only) ─────────────────────── */
(function initCursorSparkle() {
  if (window.matchMedia('(hover: none)').matches) return;  // skip touch

  const style = document.createElement('style');
  style.textContent = `
    .sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle, #E8C36A, #C9952A);
      transform: translate(-50%, -50%) scale(1);
      animation: sparkleFade 0.7s ease forwards;
    }
    @keyframes sparkleFade {
      0%   { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%,-50%) scale(2.5); }
    }
  `;
  document.head.appendChild(style);

  let last = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - last < 80) return;   // throttle
    last = now;

    const spark = document.createElement('div');
    spark.className = 'sparkle';
    spark.style.left = e.clientX + 'px';
    spark.style.top  = e.clientY + 'px';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  });
})();


/* ─── VINAYAKA TILT (mouse) ──────────────────────────────── */
(function initVinayakaTilt() {
  const img = document.querySelector('.vinayaka-img');
  if (!img) return;
  if (window.matchMedia('(hover: none)').matches) return;

  img.addEventListener('mousemove', (e) => {
    const rect = img.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width  * 20;
    const dy = (e.clientY - cy) / rect.height * 20;
    img.style.transform = `perspective(400px) rotateY(${dx}deg) rotateX(${-dy}deg) translateY(0px)`;
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
})();
