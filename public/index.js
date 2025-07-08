import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { cookieMixes } from './products.js';

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Cart state
let cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem(item, quantity) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({...item, quantity});
    }
    this.totalItems += quantity;
    this.totalPrice += item.price * quantity;
    updateCartUI();
  }
};

// DOM Elements
const searchbar = document.getElementById('search');
const cartNum = document.querySelector('.cart-counter');

// Initialize galleries
function initializeGalleries() {
  // Main Mixes Gallery
  const track = document.querySelector('.gallery-track');
  const prevBtn = document.querySelector('.gallery-arrow.prev');
  const nextBtn = document.querySelector('.gallery-arrow.next');
  const dots = document.querySelectorAll('.gallery-dot');
  let currentIndex = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    resetAllQuantities();
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cookieMixes.length;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cookieMixes.length) % cookieMixes.length;
    updateSlider();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      updateSlider();
    });
  });

  // Monotonous Gallery (single cookies)
  const mTrack = document.querySelector('.m_gallery-track');
  const mPrevBtn = document.querySelector('.m_gallery-arrow.prev');
  const mNextBtn = document.querySelector('.m_gallery-arrow.next');
  const mDots = document.querySelectorAll('.m_gallery-dot');
  let mCurrentIndex = 0;

  function updateMonotonousSlider() {
    mTrack.style.transform = `translateX(-${mCurrentIndex * 100}%)`;
    mDots.forEach((dot, i) => dot.classList.toggle('active', i === mCurrentIndex));
    resetAllQuantities();
  }

  mNextBtn.addEventListener('click', () => {
    mCurrentIndex = (mCurrentIndex + 1) % cookieMixes.length;
    updateMonotonousSlider();
  });

  mPrevBtn.addEventListener('click', () => {
    mCurrentIndex = (mCurrentIndex - 1 + cookieMixes.length) % cookieMixes.length;
    updateMonotonousSlider();
  });

  mDots.forEach(dot => {
    dot.addEventListener('click', () => {
      mCurrentIndex = parseInt(dot.dataset.index);
      updateMonotonousSlider();
    });
  });
}

// Cart functionality
function setupCartControls() {
  document.querySelectorAll('.add-btn').forEach((addBtn, index) => {
    addBtn.addEventListener('click', () => {
      const container = addBtn.closest('.cookie-controls');
      const quantityInput = container.querySelector('.quantity-input');
      const quantity = parseFloat(quantityInput.value);

      if (quantity > 0) {
        cart.addItem(cookieMixes[index], quantity);
        updateCartUI();
      }
    });
  });

  // Quantity controls
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.quantity-selector').querySelector('.quantity-input');
      input.value = (parseFloat(input.value) + 0.5).toFixed(1);
    });
  });

  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.quantity-selector').querySelector('.quantity-input');
      const newVal = parseFloat(input.value) - 0.5;
      if (newVal >= 0.5) input.value = newVal.toFixed(1);
    });
  });
}

// Update cart UI
function updateCartUI() {
  cartNum.textContent = cart.totalItems;
  cartNum.style.display = "flex";
  cartNum.classList.add('bump');
  cartNum.addEventListener('animationend', () => {
    cartNum.classList.remove('bump');
  }, { once: true });
}

// Reset quantities when changing slides
function resetAllQuantities() {
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.value = '0.5';
  });
}

// Form submission
if (searchbar) {
  searchbar.addEventListener('submit', (event) => {
    event.preventDefault();
    const dataInput = document.getElementById('dataInput').value;
    // Firebase data push would go here
    console.log('Search submitted:', dataInput);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("App initialized");
  initializeGalleries();
  setupCartControls();
 // updateCartUI();
});