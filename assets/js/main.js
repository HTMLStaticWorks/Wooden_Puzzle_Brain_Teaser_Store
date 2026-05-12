/* 
    Main Application Logic
    Handles UI interactions, cart previews, and mobile navigation
*/

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Implementation
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    const navbarRight = document.querySelector('.navbar-right');
    
    // Create Mobile Toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-btn';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.appendChild(mobileToggle);

    // Create Overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Create Inside Close Button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-menu-btn';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    navLinks.prepend(closeBtn);
    closeBtn.addEventListener('click', () => toggleMenu());

    // Clone Right Items for Mobile Menu
    const mobileRightItems = navbarRight.cloneNode(true);
    mobileRightItems.classList.remove('navbar-right'); // CRITICAL: Remove the hidden class
    mobileRightItems.classList.add('navbar-right-mobile');
    navLinks.appendChild(mobileRightItems);

    // Toggle Function
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // If it's a dropdown toggle in mobile
            if (window.innerWidth <= 1024 && link.classList.contains('dropdown-toggle')) {
                e.preventDefault();
                const parent = link.parentElement;
                parent.classList.toggle('open');
                return;
            }
            if (navLinks.classList.contains('active')) toggleMenu();
        });
        // Shop Filter Sidebar Toggle
    const filterBtn = document.querySelector('.mobile-filter-btn');
    const filterSidebar = document.querySelector('.filter-sidebar');
    const closeFilters = document.querySelector('.close-filters');

    if (filterBtn && filterSidebar) {
        filterBtn.addEventListener('click', () => {
            filterSidebar.classList.add('active');
            overlay.classList.add('active');
        });

        const hideFilters = () => {
            filterSidebar.classList.remove('active');
            if (!navLinks.classList.contains('active')) {
                overlay.classList.remove('active');
            }
        };

        if (closeFilters) closeFilters.addEventListener('click', hideFilters);
        overlay.addEventListener('click', hideFilters);
    }
});

    // Re-bind theme toggle for the cloned mobile version
    const mobileThemeToggle = mobileRightItems.querySelector('.theme-toggle');
    if (mobileThemeToggle && typeof initThemeToggle === 'function') {
        // The theme toggle logic is usually in its own file, 
        // we might need to ensure it's re-initialized for the clone.
    }
    
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Quantity Selector for Product Details
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            let val = parseInt(input.value);
            if (btn.classList.contains('plus')) val++;
            if (btn.classList.contains('minus') && val > 1) val--;
            input.value = val;
        });
    });

    // Simple Cart Notification
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Added to cart!');
        });
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerText = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});

// Toast CSS (Dynamic Injection or style.css)
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
    .toast-notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #5B3A29;
        color: #fff;
        padding: 12px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
    }
    .toast-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    [data-theme="dark"] .toast-notification {
        background: #D97706;
    }
`;
document.head.appendChild(toastStyle);
