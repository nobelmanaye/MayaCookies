// Import Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

document.addEventListener('DOMContentLoaded', function() {
    // Slider Variables
    let m_currentIndex = 0; // Mobile
    let currentIndex = 0;   // Desktop

    // Initialize Firebase
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
    const database = getDatabase(app); // Initialize Realtime Database

    // Mobile Gallery Logic
    const mtrack = document.querySelector('.m_gallery-track');
    const mslides = Array.from(document.querySelectorAll('.m_gallery-slide'));
    const mdots = Array.from(document.querySelectorAll('.m_gallery-dot'));
    const m_prevBtn = document.querySelector('.m_gallery-arrow.prev');
    const m_NextBtn = document.querySelector('.m_gallery-arrow.next');

    const m_updateSlider = () => {
        mtrack.style.transform = `translateX(-${m_currentIndex * 100}%)`;
        mdots.forEach((dot, index) => {
            dot.classList.toggle("active", index === m_currentIndex);
        });
    };

    m_prevBtn.addEventListener('click', () => {
        m_currentIndex = (m_currentIndex - 1 + mslides.length) % mslides.length;
        m_updateSlider();
        resetAllQuantities();
    });

    m_NextBtn.addEventListener('click', () => {
        m_currentIndex = (m_currentIndex + 1) % mslides.length;
        m_updateSlider();
        resetAllQuantities();
    });

    mdots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            m_currentIndex = index; // Fixed: Use the dot's index directly
            m_updateSlider();
        });
    });

    // Desktop Gallery Logic
    const track = document.querySelector('.gallery-track');
    const slides = Array.from(document.querySelectorAll('.gallery-slide'));
    const dots = Array.from(document.querySelectorAll('.gallery-dot'));
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');

    const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        resetAllQuantities();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        resetAllQuantities();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateSlider();
        });
    });

    // Cart Logic
    let totalWeight = 0;
    const cartCount = document.querySelector('.cart-count');
    const cartnum = document.querySelector('.cart-counter');

    document.querySelectorAll('.gallery-container, .m_gallery-container').forEach(container => {
        const plusBtn = container.querySelector('.quantity-btn.plus');
        const minusBtn = container.querySelector('.quantity-btn.minus');
        const quantityInput = container.querySelector('.quantity-input');
        const addBtn = container.querySelector('.add-btn');

        plusBtn.addEventListener('click', () => {
            quantityInput.value = (parseFloat(quantityInput.value) + 0.5).toFixed(1);
        });

        minusBtn.addEventListener('click', () => {
            const currentVal = parseFloat(quantityInput.value);
            if (currentVal > 0.5) {
                quantityInput.value = (currentVal - 0.5).toFixed(1);
            }
        });

        addBtn.addEventListener('click', () => {
            const weight = parseFloat(quantityInput.value);
            if (weight > 0) {
                totalWeight += weight;
                let currentCount = parseInt(cartnum.textContent);
                cartnum.textContent = currentCount + 1;
                cartnum.style.display = "flex";
                cartnum.classList.add('bump');

                cartnum.addEventListener('animationend', function handler() {
                    cartnum.classList.remove('bump');
                    cartnum.removeEventListener('animationend', handler);
                });
                console.log("starting current index")
                console.log(currentIndex)

                

                addBtn.classList.add('cookie-added');
                setTimeout(() => addBtn.classList.remove('cookie-added'), 400);
            }
        });

        quantityInput.addEventListener('change', () => {
            let value = parseFloat(quantityInput.value);
            value = Math.round(value * 2) / 2; // Round to nearest 0.5
            value = Math.max(0.5, Math.min(10, value)); // Clamp between 0.5-10
            quantityInput.value = value.toFixed(1);
        });
    });

    document.querySelector('.cart').addEventListener('click', () => {
        window.location.href = "cart.html";
    });

    function resetAllQuantities() {
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.value = '0.5'; // Reset to minimum allowed value
        });
    }
});