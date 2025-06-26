document.addEventListener('DOMContentLoaded', () => {
  const cartCountElement = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const proceedCheckoutButton = document.getElementById('proceed-checkout');

  // Utility functions
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

  function addToCartFromElement(button) {
    const itemId = button.dataset.id;
    const itemName = button.dataset.name;
    const itemPrice = parseFloat(button.dataset.price);
    const itemImage = button.dataset.image || '/images/placeholder.jpg';

    let cart = getCart();
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1, image: itemImage });
    }

    saveCart(cart);
    updateCartCount();

    // Render cart UI after adding an item
    renderCart();
  }

  // Listen for all clicks on the page
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      addToCartFromElement(e.target);
    }

    if (e.target.classList.contains('remove-item')) {
      removeItemFromCart(e);
    }

    if (e.target.id === 'proceed-checkout') {
      proceedToCheckout();
    }
  });

  function renderCart() {
    if (!cartItemsContainer) return;

    const cart = getCart();
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image || '/images/placeholder.jpg'}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
        <p><strong>Total:</strong> ₹${(item.price * item.quantity).toFixed(2)}</p>
        <button class="btn remove-item" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    updateTotalPrice();

    // Update buy buttons state every time the cart is rendered
    updateBuyButtons();
  }

  function updateTotalPrice() {
    if (!totalPriceElement) return;
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2);
    console.log('Total price updated:', total);
  }
  
  function updateBuyButtons() {
    const cart = getCart();
    const amazonBtn = document.getElementById('buy-amazon');
    const flipkartBtn = document.getElementById('buy-flipkart');

    const amazonItem = cart.find(item => item.platform === 'Amazon');
    const flipkartItem = cart.find(item => item.platform === 'Flipkart');

    if (amazonItem && amazonBtn) {
      amazonBtn.disabled = false;
      amazonBtn.onclick = () => window.open(amazonItem.link, '_blank');
    } else if (amazonBtn) {
      amazonBtn.disabled = true;
      amazonBtn.onclick = null;
    }

    if (flipkartItem && flipkartBtn) {
      flipkartBtn.disabled = false;
      flipkartBtn.onclick = () => window.open(flipkartItem.link, '_blank');
    } else if (flipkartBtn) {
      flipkartBtn.disabled = true;
      flipkartBtn.onclick = null;
    }
  }

  function removeItemFromCart(event) {
    const itemId = event.target.dataset.id;
    let cart = getCart();
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    renderCart();
    updateCartCount();
  }

  function proceedToCheckout() {
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

  // Initial setup
  updateCartCount();
  renderCart();
});
