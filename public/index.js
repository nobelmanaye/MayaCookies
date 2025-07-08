// Import Firebase SDKs
  
//import { indexedDBLocalPersistence } from "firebase/auth/web-extension";
// With this:
//import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// OR if using npm:
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', function() {
  
// Your web app's Firebase configuration

console.log("test start");

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Handle form submission
const searchbar = document.getElementById('dataInput');
searchbar.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the value from the input field
    const dataInput = document.getElementById('dataInput').value;

    // Push data to Firebase
    push(ref(database, 'data/'), {
        input: dataInput
    }).then(() => {
        console.log('Data saved successfully!');
        document.getElementById('dataInput').value = ''; // Clear the input field
    }).catch((error) => {
        console.error('Error saving data: ', error);
    });
});


const mtrack = document.querySelector('.m_gallery-track');
    const mslides = Array.from(
    document.querySelectorAll('.m_gallery-slide'));
    const mdots = Array.from(document.querySelectorAll('.m_gallery-dot'));
    const m_prevBtn = document.querySelector('.m_gallery-arrow.prev');
    const m_NextBtn = document.querySelector('.m_gallery-arrow.next');
    let m_currentIndex = 0

    const m_updateSlider= () =>{


        mtrack.style.transform = (`translateX(-${m_currentIndex * 100}%)`);

        mdots.forEach((dot,index)=>{
            console.log(m_currentIndex);

            dot.classList.toggle("active", index==m_currentIndex);
        });

    };

  
m_prevBtn.addEventListener('click', () => {
                m_currentIndex = (m_currentIndex - 1 + mslides.length) % mslides.length;
                m_updateSlider();
                 resetAllQuantities();
            });
    m_NextBtn.addEventListener('click', () =>{

        m_currentIndex = (m_currentIndex+1)% mslides.length

        m_updateSlider();

        resetAllQuantities();

    });

    mdots.forEach(dot => {
        dot.addEventListener('click', ()=> {
            m_currentIndex = (m_currentIndex + 1)%mslides.length;
            m_updateSlider();


        });





    });

    m_updateSlider();



   



    


const track = document.querySelector('.gallery-track');
            const slides = Array.from(document.querySelectorAll('.gallery-slide'));
            const dots = Array.from(document.querySelectorAll('.gallery-dot'));
            const prevBtn = document.querySelector('.gallery-arrow.prev');
            const nextBtn = document.querySelector('.gallery-arrow.next');
            
            let currentIndex = 0;

            
            // Update slider position
            const updateSlider = () => {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            };
            
            // Next slide
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
                 resetAllQuantities();
            });
            
            // Previous slide
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
                 resetAllQuantities();
            });
            
            // Dot navigation
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    currentIndex = parseInt(dot.dataset.index);
                    updateSlider();
                });
            });
})



document.addEventListener('DOMContentLoaded', () => {
    const galleryTypes = ['.gallery-container', '.m_gallery-container'];
    let totalWeight = 0; // Now tracking weight instead of quantity
    const cartCount = document.querySelector('.cart-count');
    
    galleryTypes.forEach(selector => {
        document.querySelectorAll(selector).forEach(container => {
            const plusBtn = container.querySelector('.quantity-btn.plus');
            const minusBtn = container.querySelector('.quantity-btn.minus');
            const quantityInput = container.querySelector('.quantity-input');
            const addBtn = container.querySelector('.add-btn');
            const cartnum = document.querySelector('.cart-counter');
            
            // Quantity controls - now in 0.5kg increments
            plusBtn.addEventListener('click', () => {
                quantityInput.value = (parseFloat(quantityInput.value) + 0.5).toFixed(1);
            });
            
            minusBtn.addEventListener('click', () => {
                const currentVal = parseFloat(quantityInput.value);
                if (currentVal > 0.5) {
                    quantityInput.value = (currentVal - 0.5).toFixed(1);
                }
            });
            
            // Add to cart - now tracking kg instead of items
            addBtn.addEventListener('click', () => {
                const weight = parseFloat(quantityInput.value);

                if (weight>0){
                totalWeight += weight;
                console.log(cartnum);

                
                // Update cart display (round to nearest 0.5 for display)
               //artCount.textContent = totalWeight.toFixed(1);
                let currentCount = parseInt(cartnum.textContent);
                cartnum.textContent = currentCount+1;
                cartnum.style.display= "flex";
                    cartnum.classList.add('bump');
    
                // Remove the class after animation completes
                cartnum.addEventListener('animationend', function handler() {
                    cartnum.classList.remove('bump');
                    cartnum.removeEventListener('animationend', handler);
                });
                
                // Visual feedback for button
                addBtn.classList.add('cookie-added');
                setTimeout(() => {
                    addBtn.classList.remove('cookie-added');
                }, 400);

    
                
                // Visual feedback
                addBtn.classList.add('cookie-added');
            //  cartCount.parentElement.classList.add('cart-bounce');
                
                setTimeout(() => {
                    addBtn.classList.remove('cookie-added');
             //     cartCount.parentElement.classList.remove('cart-bounce');
                }, 400);
                
                console.log(`Added ${weight}kg from ${selector}`);
         
            }
         
            });
            
            // Validate manual input
            quantityInput.addEventListener('change', () => {
                let value = parseFloat(quantityInput.value);
                
                // Ensure value is a multiple of 0.5
                value = Math.round(value * 2) / 2;
                
                // Enforce min/max
                value = Math.max(0.5, Math.min(10, value));
                
                quantityInput.value = value.toFixed(1);
            });
        });
    });
});

// Event listener for the "Next" button


// Initialize the first image

//update cart count based on added. 





//slider for mixer

function resetAllQuantities() {
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.value = '0.0';
        ; // Can't be zero due to your min="0.5"
        // If you want to allow zero, change the HTML min attribute to 0
    });
}
