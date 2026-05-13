/* 
    GSAP Animations - Ultra-Snappy Edition
    Premium motion for the Wooden Puzzle Store
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. FALLBACK MECHANISM: Ensure everything is visible if animations fail
    const forceVisibility = () => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        document.querySelectorAll('.product-card').forEach(el => {
            gsap.set(el, { opacity: 1, y: 0, scale: 1, visibility: 'visible' });
        });
    };

    if (typeof gsap === 'undefined') {
        forceVisibility();
        return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // --- Core Page Animations ---
    
    // Hero Section Animations
    gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', clearProps: "all" });
    gsap.from('.hero h1', { opacity: 0, y: 30, duration: 1.2, delay: 0.2, ease: 'power3.out', clearProps: "all" });
    gsap.from('.hero p', { opacity: 0, y: 20, duration: 1, delay: 0.4, ease: 'power3.out', clearProps: "all" });
    gsap.from('.hero .btn-primary, .hero .btn-outline', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        delay: 0.6, 
        ease: 'power2.out', 
        stagger: 0.2,
        clearProps: "all"
    });
    gsap.from('.navbar', { y: -100, duration: 1, ease: 'power4.out' });

    // --- Section Titles & General Reveals ---
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // --- Product Cards - Ultra Snappy & Reliable ---
    if (typeof ScrollTrigger !== 'undefined') {
        const cards = document.querySelectorAll('.product-card');
        
        // Using a more immediate trigger and faster animation
        ScrollTrigger.batch(cards, {
            start: "top 98%", // Start animation almost immediately when visible
            once: true,
            onEnter: batch => {
                gsap.fromTo(batch, 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out", overwrite: true }
                );
            }
        });

        // Safety: Refresh on window load
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
            // Force visibility after a short timeout if still hidden
            setTimeout(forceVisibility, 1500);
        });
    } else {
        forceVisibility();
    }
});
