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
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (window.gsap) {
                gsap.fromTo('body', { opacity: 0.8 }, { opacity: 1, duration: 0.5 });
            }
        });
    }

    // RTL Support
    const rtlToggle = document.querySelector('.rtl-toggle');
    const savedRtl = localStorage.getItem('rtl') === 'true';
    
    if (savedRtl) {
        htmlElement.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
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
        });
    }
});
