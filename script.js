// ── Scroll Reveal ──
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-60px' });
  reveals.forEach(el => observer.observe(el));
}

// ── Navbar scroll effect ──
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }
}

// ── Empathy Body (Desktop) ──
function initEmpathyDesktop() {
  const container = document.querySelector('.empathy-container');
  if (!container) return;

  const regions = [
    { id: 'head', labelId: 'label-head' },
    { id: 'eyes', labelId: 'label-eyes' },
    { id: 'heart', labelId: 'label-heart' },
    { id: 'hands', labelId: 'label-hands' },
    { id: 'feet', labelId: 'label-feet' },
  ];
  const bodyParts = {
    head: container.querySelectorAll('.body-head'),
    eyes: container.querySelectorAll('.body-eyes'),
    heart: container.querySelectorAll('.body-heart'),
    hands: container.querySelectorAll('.body-hands'),
    feet: container.querySelectorAll('.body-feet'),
  };

  let showAll = false;

  // Hover handlers
  regions.forEach(region => {
    const hotzone = container.querySelector(`[data-region="${region.id}"]`);
    const label = document.getElementById(region.labelId);
    if (!hotzone || !label) return;

    hotzone.addEventListener('mouseenter', () => {
      if (showAll) return;
      label.classList.add('visible');
      if (bodyParts[region.id]) bodyParts[region.id].forEach(p => p.classList.add('active'));
    });
    hotzone.addEventListener('mouseleave', () => {
      if (showAll) return;
      label.classList.remove('visible');
      if (bodyParts[region.id]) bodyParts[region.id].forEach(p => p.classList.remove('active'));
    });
  });

  // Click to show all
  container.addEventListener('click', () => {
    showAll = !showAll;
    regions.forEach(region => {
      const label = document.getElementById(region.labelId);
      if (label) label.classList.toggle('visible', showAll);
      if (bodyParts[region.id]) bodyParts[region.id].forEach(p => p.classList.toggle('active', showAll));
    });
  });
}

// ── Empathy Body (Mobile) ──
function initEmpathyMobile() {
  const container = document.querySelector('.empathy-mobile');
  if (!container) return;

  const regionIds = ['head', 'eyes', 'heart', 'hands', 'feet'];
  const cards = document.querySelectorAll('.empathy-mobile-region');
  const bodyParts = {
    head: container.querySelectorAll('.body-head'),
    eyes: container.querySelectorAll('.body-eyes'),
    heart: container.querySelectorAll('.body-heart'),
    hands: container.querySelectorAll('.body-hands'),
    feet: container.querySelectorAll('.body-feet'),
  };
  let currentIndex = -1;

  container.querySelector('svg').addEventListener('click', () => {
    // Clear all highlights
    regionIds.forEach(id => {
      if (bodyParts[id]) bodyParts[id].forEach(p => p.classList.remove('active'));
    });

    currentIndex++;
    if (currentIndex >= regionIds.length) currentIndex = -1;

    cards.forEach(c => c.style.display = 'none');

    if (currentIndex >= 0) {
      const activeCard = document.getElementById(`mobile-card-${regionIds[currentIndex]}`);
      if (activeCard) activeCard.style.display = 'block';
      if (bodyParts[regionIds[currentIndex]]) {
        bodyParts[regionIds[currentIndex]].forEach(p => p.classList.add('active'));
      }
    } else {
      document.getElementById('mobile-card-hint').style.display = 'block';
    }
  });
}

// ── Ocean Dive (About Summary) ──
function initOceanDive() {
  const dive = document.querySelector('.ocean-dive');
  if (!dive) return;
  // Touch support for mobile
  dive.addEventListener('touchstart', () => dive.classList.add('active'));
  dive.addEventListener('touchend', () => dive.classList.remove('active'));
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initEmpathyDesktop();
  initEmpathyMobile();
  initOceanDive();
});
