/**
 * Artisan Puzzles - Cart Page Rendering
 * Manages the cart page content and calculations
 */

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('btn-checkout');
    const tableHeader = document.querySelector('table');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('artisan_cart')) || [];
        
        if (cart.length === 0) {
            if (tableHeader) tableHeader.style.display = 'none';
            if (emptyMsg) emptyMsg.style.display = 'block';
            if (checkoutBtn) checkoutBtn.classList.add('disabled');
            updateTotals(0);
            return;
        }

        if (tableHeader) tableHeader.style.display = 'table';
        if (emptyMsg) emptyMsg.style.display = 'none';
        if (checkoutBtn) checkoutBtn.classList.remove('disabled');
        
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" width="60" class="rounded me-3" alt="${item.name}">
                        <span class="fw-bold">${item.name}</span>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-controls active" style="width: fit-content;">
                        <button class="qty-btn" onclick="updateCartPageQty('${item.id}', -1)"><i class="fas fa-minus"></i></button>
                        <span class="qty-count">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartPageQty('${item.id}', 1)"><i class="fas fa-plus"></i></button>
                    </div>
                </td>
                <td class="fw-bold">$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm text-danger" onclick="updateCartPageQty('${item.id}', -${item.quantity})">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        updateTotals(subtotal);
    }

    function updateTotals(subtotal) {
        const shipping = subtotal > 0 ? (subtotal > 150 ? 0 : 15.00) : 0;
        const total = subtotal + shipping;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 && subtotal > 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    // Global function for onclick handlers
    window.updateCartPageQty = function(id, delta) {
        let cart = JSON.parse(localStorage.getItem('artisan_cart')) || [];
        const item = cart.find(i => i.id === id);
        
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
        }
        
        localStorage.setItem('artisan_cart', JSON.stringify(cart));
        
        // Sync with navbar badge if exists
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) {
            const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
            cartBadge.textContent = totalItems;
        }

        renderCart();
    };

    renderCart();
});
