document.addEventListener('DOMContentLoaded', () => {
  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || { items: [], totalItems: 0, totalPrice: 0 };
  const cartContainer = document.getElementById('cart-items-container');
  
  // Clear previous content
  cartContainer.innerHTML = '';
  
  if (cart.items.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-message">
        <img src="Images/empty-cart.png" alt="Empty cart" class="empty-cart-icon">
        <p>Your cart is empty</p>
        <a href="index.html" class="continue-shopping">Continue Shopping</a>
      </div>
    `;
    console.log("no items");
  } else {
    cart.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <span>Quantity: ${item.quantity}</span>
          </div>
          <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
      cartContainer.appendChild(itemElement);

       console.log("items");
    });
    
    // Update summary section
    document.querySelector('.summary-row.total span:last-child').textContent = `$${cart.totalPrice.toFixed(2)}`;
    document.querySelector('.summary-row:first-child span:last-child').textContent = `$${cart.totalPrice.toFixed(2)}`;
    document.querySelector('.checkout-btn').disabled = false;
  }
  
  // Update cart counter in header
  const cartCounter = document.querySelector('.cart-counter');
  if (cartCounter) {
    cartCounter.textContent = cart.totalItems;
  }
});