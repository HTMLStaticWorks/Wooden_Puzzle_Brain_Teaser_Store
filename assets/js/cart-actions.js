/**
 * Artisan Puzzles - Cart Actions
 * Handles the "Add to Cart" toggle, Quantity adjustments, and LocalStorage persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('artisan_cart')) || [];
    
    // Initial UI state based on localStorage
    updateUIFromCart();

    // Event Delegation for "Add to Cart"
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const btn = e.target;
            const wrapper = btn.closest('.cart-action-wrapper');
            const card = btn.closest('.product-card');
            const controls = wrapper.querySelector('.quantity-controls');
            
            const product = {
                id: card.querySelector('.title').textContent.trim().toLowerCase().replace(/\s+/g, '-'),
                name: card.querySelector('.title').textContent.trim(),
                price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
                image: card.querySelector('img').getAttribute('src'),
                quantity: 1
            };

            addToCart(product);
            
            btn.style.display = 'none';
            controls.classList.add('active');
            wrapper.querySelector('.qty-count').textContent = '1';
        }

        // Quantity Adjustment
        if (e.target.closest('.qty-btn')) {
            const btn = e.target.closest('.qty-btn');
            const wrapper = btn.closest('.cart-action-wrapper');
            const card = btn.closest('.product-card');
            const productId = card.querySelector('.title').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            const countSpan = wrapper.querySelector('.qty-count');
            
            if (btn.classList.contains('plus')) {
                updateQuantity(productId, 1);
            } else if (btn.classList.contains('minus')) {
                updateQuantity(productId, -1);
            }
            
            // Refresh count display
            const item = cart.find(i => i.id === productId);
            if (item) {
                countSpan.textContent = item.quantity;
            } else {
                // Item was removed (count hit 0)
                wrapper.querySelector('.btn-add-to-cart').style.display = 'block';
                wrapper.querySelector('.quantity-controls').classList.remove('active');
            }
        }

        // Remove from Cart
        if (e.target.closest('.btn-remove-cart')) {
            const btn = e.target.closest('.btn-remove-cart');
            const wrapper = btn.closest('.cart-action-wrapper');
            const card = btn.closest('.product-card');
            const productId = card.querySelector('.title').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            
            removeFromCart(productId);
            
            wrapper.querySelector('.btn-add-to-cart').style.display = 'block';
            wrapper.querySelector('.quantity-controls').classList.remove('active');
            wrapper.querySelector('.qty-count').textContent = '1';
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveCart();
    }

    function updateQuantity(id, delta) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
            }
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
    }

    function saveCart() {
        localStorage.setItem('artisan_cart', JSON.stringify(cart));
        updateCartBadge();
    }

    function updateCartBadge() {
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            gsap.fromTo(cartBadge, { scale: 1.5 }, { scale: 1, duration: 0.3 });
        }
    }

    function updateUIFromCart() {
        updateCartBadge();
        
        // Sync shop page cards with cart state
        cart.forEach(item => {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                const title = card.querySelector('.title').textContent.trim();
                if (title === item.name) {
                    const btn = card.querySelector('.btn-add-to-cart');
                    const controls = card.querySelector('.quantity-controls');
                    const countSpan = card.querySelector('.qty-count');
                    
                    if (btn && controls && countSpan) {
                        btn.style.display = 'none';
                        controls.classList.add('active');
                        countSpan.textContent = item.quantity;
                    }
                }
            });
        });
    }
});
