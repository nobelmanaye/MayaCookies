document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || { 
    items: [], 
    totalItems: 0, 
    totalPrice: 0 
  };

  // Get DOM elements
  const cartContainer = document.getElementById('cart-items-container');
  const emptyCartMsg = document.getElementById('empty-cart-message');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const cartCounter = document.querySelector('.cart-counter');
  
  // Clear cart container
  cartContainer.innerHTML = '';

  if (cart.items.length === 0) {
    emptyCartMsg.style.display = 'block';
  } else {
    emptyCartMsg.style.display = 'none';
    if(cart){
      cart.items.forEach(item => {
        const itemHTML = `
          <div class="cart-item">
            <img src="${item.imagePath}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-price">Price: $${item.price}</p>
              <div class="cart-item-quantity">
                <span>Quantity: ${item.weight}</span>
              </div>
            </div>
          </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
      });
    }
    
    document.querySelector('.summary-row.total span:last-child').textContent = cart.totalPrice;
    checkoutBtn.disabled = false;

    checkoutBtn.addEventListener("click", () => {
      // Get the position of the cart items container
      const cartRect = cartContainer.getBoundingClientRect();
      
      // Hide cart items and show popup in the same position
      cartContainer.style.opacity = '0';
      
      // Show popup positioned exactly where cart items were
      const shippingPopup = document.getElementById('shipping-popup');
      if (shippingPopup) {
        // Position the popup content where cart items were
        const popupContent = shippingPopup.querySelector('.popup-content');
        popupContent.style.cssText = `
          position: absolute;
          top: ${cartRect.top}px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 30px;
          border-radius: 15px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 1001;
        `;
        
        shippingPopup.style.display = 'block';
        
        // Populate order summary
        document.getElementById('popup-subtotal').textContent = `$${cart.totalPrice.toFixed(2)}`;
        const vat = cart.totalPrice * 0.15;
        document.getElementById('popup-vat').textContent = `$${vat.toFixed(2)}`;
        document.getElementById('popup-total').textContent = `$${(cart.totalPrice + vat).toFixed(2)}`;
        
        // Add exact location button
        const locationBtn = document.createElement('button');
        locationBtn.type = 'button';
        locationBtn.textContent = '📍 Get Exact Location';
        locationBtn.style.cssText = 'width: 100%; padding: 12px; margin: 15px 0; background: #85f389; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;';
        
        const addressGroup = document.querySelector('.form-group:has(#address)');
        if (addressGroup) {
          addressGroup.parentNode.insertBefore(locationBtn, addressGroup.nextSibling);
        }
        
        locationBtn.addEventListener('click', () => {
          if (navigator.geolocation) {
            locationBtn.textContent = '📍 Getting Exact Location...';
            locationBtn.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Auto-fill address with exact coordinates
                const addressField = document.getElementById('address');
                if (addressField) {
                  addressField.value = `Exact Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                  addressField.style.color = '#85f389';
                  addressField.style.fontWeight = 'bold';
                }
                
                locationBtn.textContent = '📍 Exact Location Acquired!';
                locationBtn.style.background = '#4CAF50';
              },
              (error) => {
                alert('Unable to get exact location. Please allow location access.');
                locationBtn.textContent = '📍 Get Exact Location';
                locationBtn.disabled = false;
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
              }
            );
          } else {
            alert('Geolocation is not supported by this browser.');
          }
        });

        // Close popup handler - show cart items again
        const closePopup = document.querySelector('.close-popup');
        if (closePopup) {
          closePopup.onclick = () => {
            shippingPopup.style.display = 'none';
            cartContainer.style.opacity = '1';
          };
        }

        // Form submission handler
        const shippingForm = document.getElementById('shipping-form');
        if (shippingForm) {
          shippingForm.onsubmit = (e) => {
            e.preventDefault();
            alert('Order placed successfully!');
            shippingPopup.style.display = 'none';
            cartContainer.style.opacity = '1';
          };
        }
      }
    });
  }
  
  if (cartCounter) cartCounter.textContent = cart.totalItems;
});