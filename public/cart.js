// cart.js
import { cart } from './index.js'; // Import your cart object

document.addEventListener('DOMContentLoaded', () => {
  // Load cart from localStorage
  cart.loadFromLocalStorage();
  
  // Display cart items
  const cartContainer = document.createElement('div');
  cartContainer.className = 'cart-container';
  
  if (cart.items.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
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
    });
    
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `
      <h3>Total Items: ${cart.totalItems}</h3>
      <h3>Total Price: $${cart.totalPrice.toFixed(2)}</h3>
    `;
    cartContainer.appendChild(totalElement);
  }
  
  document.body.appendChild(cartContainer);
});