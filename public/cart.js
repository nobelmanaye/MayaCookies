document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || { 
    items: [], 
    totalItems: 0, 
    totalPrice: 0 
  };
  console.log("here");
  console.log(cart);

  // Get DOM elements
  const cartContainer = document.getElementById('cart-items-container');
  const emptyCartMsg = document.getElementById('empty-cart-message');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const cartCounter = document.querySelector('.cart-counter');

  // Exit if critical elements are missing
  // if (!cartContainer || !emptyCartMsg) {
  //   console.error("Error: Required elements not found!");
  //   return;
  // }

  // Clear cart container
  cartContainer.innerHTML = '';

  
    emptyCartMsg.style.display = 'block'; // Show empty message
 
    
    emptyCartMsg.style.display = 'none';  // Hide empty message
    if(cart){
      
    cart.items.forEach(item => {

      
      const itemHTML = `
        <div class="cart-item">
          <img src="${item.imagePath}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <div class="cart-item-quantity">
              <span>Quantity: ${item.weight}</span>
            </div>
            <p>Total: $${(item.price * item.weight)}</p>
          </div>
        </div>
      `;
      cartContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

  }
    // Update summary
    document.querySelector('.summary-row.total span:last-child').textContent = cart.totalPrice;
    checkoutBtn.disabled = false;
  

  
  if (cartCounter) cartCounter.textContent = cart.totalItems;
});