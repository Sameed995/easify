document.addEventListener('DOMContentLoaded', () => {
    // Selectors for index.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');

    // Selectors for cart.html
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const proceedCheckoutButton = document.getElementById('proceed-checkout');

    // Utility Functions
    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved:', cart);
    }

    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
        console.log('Cart count updated:', totalItems);
    }

    function addToCart(event) {
        console.log('Add to Cart button clicked');
        const button = event.target;
        const itemId = button.dataset.id;
        const itemName = button.dataset.name;
        const itemPrice = parseFloat(button.dataset.price);

        let cart = getCart();
        const existingItem = cart.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
        }

        saveCart(cart);
        updateCartCount();
    }

    function renderCart() {
        if (!cartItemsContainer) return;

        const cart = getCart();
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="./images/cabinet.jpg" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
                <p><strong>Total:</strong> ₹${(item.price * item.quantity).toFixed(2)}</p>
                <button class="btn remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        updateTotalPrice();

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });
    }

    function updateTotalPrice() {
        if (!totalPriceElement) return;

        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = total.toFixed(2);
        console.log('Total price updated:', total);
    }

    function removeItemFromCart(event) {
        console.log('Remove item button clicked');
        const itemId = event.target.dataset.id;
        let cart = getCart();
        cart = cart.filter(item => item.id !== itemId);
        saveCart(cart);
        renderCart();
        updateCartCount();
    }

    function proceedToCheckout() {
        console.log('Proceeding to checkout');
        const cart = getCart();
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Proceeding to checkout...');
        localStorage.removeItem('cart');
        renderCart();
        updateCartCount();
    }

    // Initialize functionality
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    if (cartCountElement) {
        updateCartCount();
    }

    if (cartItemsContainer) {
        renderCart();
    }

    if (proceedCheckoutButton) {
        proceedCheckoutButton.addEventListener('click', proceedToCheckout);
    }
});
