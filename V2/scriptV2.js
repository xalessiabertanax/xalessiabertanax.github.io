gsap.registerPlugin(ScrollTrigger);

// --- 1. Custom Cursor ---
const cursor = document.querySelector('.cursor');
const interactElements = document.querySelectorAll('.hover-link, .text-interact, .btn');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX, y: e.clientY,
        duration: 0.15, ease: "power2.out"
    });
});

interactElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// --- 2. GSAP Scroll Animations ---
// Reveal elementen terwijl je scrollt
const revealElements = document.querySelectorAll('.gs-reveal');
revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 40 }, 
        {
            duration: 1, autoAlpha: 1, y: 0, ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", 
                toggleActions: "play none none reverse" 
            }
        }
    );
});

// --- 3. Three.js 3D Background Element ---
// Dit creëert een abstract 'creatief' 3D object dat heel zacht in de achtergrond draait
const container = document.getElementById('webgl-container');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Alpha true maakt het transparant over je #FFF2E5
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Het "Creatieve" Object (Een organische Icosahedron vorm)
const geometry = new THREE.IcosahedronGeometry(2.5, 1);
// We gebruiken de accentkleur Fuchsia (#DE2B52) met een wireframe look
const material = new THREE.MeshBasicMaterial({ 
    color: 0xDE2B52, 
    wireframe: true,
    transparent: true,
    opacity: 0.15 // Heel zacht op de achtergrond
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

camera.position.z = 6;
shape.position.x = 2; // Beetje naar rechts plaatsen

// Animatieloop voor 3D object
function animate() {
    requestAnimationFrame(animate);
    
    // Zachte, organische rotatie
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}
animate();

// Laat 3D object reageren op scrollen (Extra magic touch)
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    shape.rotation.y = scrollY * 0.005;
    shape.position.y = scrollY * -0.002;
});

// Resize handler voor 3D canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});