/* 
    GSAP Animations
    Premium motion for the Wooden Puzzle Store
*/

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' });
    gsap.from('.hero h1', { opacity: 0, y: 30, duration: 1.2, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero p', { opacity: 0, y: 20, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero .btn', { opacity: 0, scale: 0.9, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)', stagger: 0.2 });

    // Navbar reveal
    gsap.from('.navbar', { y: -100, duration: 1, ease: 'power4.out' });

    // Product Card Stagger
    if (document.querySelector('.product-card')) {
        gsap.from('.product-card', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: "all",
            scrollTrigger: {
                trigger: '.product-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Scroll reveal functionality for general sections
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
});
