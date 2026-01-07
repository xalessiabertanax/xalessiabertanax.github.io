lucide.createIcons();

// --- THEME TOGGLE ---
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// --- CURSOR ---
const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('a, button, .image-frame, .hero-visual, .project-item');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
});

// --- MAGNETIC IMAGE ---
const magneticWrap = document.querySelector('.magnetic-wrap');
const imageBlobs = document.querySelector('.image-blobs');

if(magneticWrap) {
    magneticWrap.addEventListener('mousemove', (e) => {
        const rect = magneticWrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        imageBlobs.style.transform = `translate(${x/20}px, ${y/20}px) rotate(0deg)`;
    });

    magneticWrap.addEventListener('mouseleave', () => {
        imageBlobs.style.transform = `translate(0px, 0px) rotate(-2deg)`;
    });
}

// --- SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-up');
hiddenElements.forEach((el) => observer.observe(el));