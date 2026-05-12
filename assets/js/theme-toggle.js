/* 
    Theme Toggle Logic
    Persists theme choice in localStorage
*/

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Theme Toggle delegation
    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle')) {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (window.gsap) {
                gsap.fromTo('body', { opacity: 0.8 }, { opacity: 1, duration: 0.5 });
            }
        }
    });

    // RTL Support delegation
    const savedRtl = localStorage.getItem('rtl') === 'true';
    if (savedRtl) htmlElement.setAttribute('dir', 'rtl');

    document.addEventListener('click', (e) => {
        if (e.target.closest('.rtl-toggle')) {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            const newRtl = !isRtl;
            
            if (newRtl) {
                htmlElement.setAttribute('dir', 'rtl');
            } else {
                htmlElement.removeAttribute('dir');
            }
            
            localStorage.setItem('rtl', newRtl);
            
            if (window.gsap) {
                gsap.from('body', { x: newRtl ? 30 : -30, opacity: 0, duration: 0.4 });
            }
        }
    });
});
