/* --- INTELLIGENT CYCLIST ANIMATION --- */
let lastScrollTop = 0;
let isScrollingTimer; // Timer to detect when scrolling stops

function moveBike() {
    const section = document.querySelector('.journey-section');
    const bike = document.getElementById('bikeRider');
    
    // Only run on desktop
    if(!section || !bike || window.innerWidth < 900) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // --- 1. CALCULATE POSITION ---
    // Start moving when the section hits the middle of the viewport
    let startPoint = viewportHeight * 0.5; 
    let distance = startPoint - rect.top;
    let totalHeight = rect.height;
    
    let percentage = distance / totalHeight;
    percentage = Math.max(0, Math.min(1, percentage));
    
    // Move the bike
    bike.style.top = (percentage * 100) + '%';

    // --- 2. HANDLE ROTATION (Direction) ---
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // If we moved significantly...
    if (Math.abs(currentScrollTop - lastScrollTop) > 2) {
        if (currentScrollTop > lastScrollTop) {
            // Scrolling DOWN -> Rotate to point down (90deg)
            bike.style.transform = `translate(-50%, -50%) rotate(90deg)`;
        } else {
            // Scrolling UP -> Rotate to point up (-90deg)
            bike.style.transform = `translate(-50%, -50%) rotate(-90deg)`;
        }
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

    // --- 3. RESET WHEN STOPPED ---
    // Clear the timer every time we scroll
    window.clearTimeout(isScrollingTimer);

    // Set a new timer. If no scroll happens for 150ms, we assume stopped.
    isScrollingTimer = setTimeout(() => {
        // Reset to Horizontal (0deg)
        bike.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    }, 150);
}

// Add listeners
window.addEventListener('scroll', moveBike);
window.addEventListener('resize', moveBike);

/* --- 1. GLOBAL FUNCTIONS (Must be outside DOMContentLoaded) --- */
function setToolkit(mode) {
    // 1. Update the container state to trigger CSS changes
    const cloud = document.getElementById('skillCloud');
    if (cloud) {
        cloud.setAttribute('data-state', mode);
    }

    // 2. Update button active styling
    const buttons = document.querySelectorAll('.toolkit-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Logic: specific mode OR 'all' catches everything
        if(btn.innerText.toLowerCase().includes(mode) || (mode === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });
}

/* --- 2. PAGE LOAD LOGIC --- */
document.addEventListener("DOMContentLoaded", () => {

    // --- INITIALIZE ICONS ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- THEME TOGGLE ---
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.cursor');
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        const hoverTargets = document.querySelectorAll('a, button, .image-frame, .hero-visual, .project-item, .project-card, .work-card, .btn-case-study, .toolkit-btn');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
        });
    }

    // --- MAGNETIC IMAGE ---
    const magneticWrap = document.querySelector('.magnetic-wrap');
    const imageBlobs = document.querySelector('.image-blobs');

    if (magneticWrap && imageBlobs) {
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

    // --- SCROLL ANIMATION FIX ---
    const observerOptions = {
        threshold: 0, /* Trigger immediately when any part is visible */
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-up');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- HAMBURGER MENU ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = hamburgerBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); 
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                if(icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- NAVBAR SHADOW ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
            } else {
                navbar.style.boxShadow = "none";
            }
        });
    }
});