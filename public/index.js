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


        mtrack.style.transform = (`translateX(-${m_currentIndex*100}%)`);

        mdots.forEach((dot,index)=>{

            dot.classList.toggle("active", index==m_currentIndex)
        });

    };

  
m_prevBtn.addEventListener('click', () => {
                m_currentIndex = (m_currentIndex - 1 + slides.length) % slides.length;
                m_updateSlider();
            });
    m_NextBtn.addEventListener('click', () =>{

        m_currentIndex = (m_currentIndex+1)% mslides.length

        m_updateSlider();


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
            });
            
            // Previous slide
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });
            
            // Dot navigation
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    currentIndex = parseInt(dot.dataset.index);
                    updateSlider();
                });
            });
})

// Event listener for the "Next" button


// Initialize the first image




//slider for mixer


