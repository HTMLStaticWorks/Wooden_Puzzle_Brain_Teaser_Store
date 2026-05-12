/* 
    Main Application Logic
    Handles UI interactions, cart previews, and mobile navigation
*/

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (if implemented)
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    // Add logic to navbar for mobile later if needed
    
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
