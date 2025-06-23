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
const images = [
    "Images/stagea_2/mix_2_many.jpg",
    "Images/stagea_2/shaun_the_sheep_many.jpg",
    "Images/stagea_2/snowman_many.jpg",
    "Images/stagea_2/Star_many-remove.png",
    "Images/stagea_2/teddybair_many.png"
];

let currentIndex = 0; // Track the current image index

// Get elements
const galleryImage = document.getElementById("gallery-image");


//const variable = document.getElementById();

// Function to update the image with a fade effect
function updateImage() {
    galleryImage.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
        galleryImage.src = images[currentIndex]; // Change the image source
        galleryImage.classList.remove("fade-out"); // Remove fade-out class
    }, 500); // Match the transition duration
    console.log("index ", currentIndex);
}

// Event listener for the "Next" button


// Initialize the first image




//slider for mixer
const slider = document.getElementById("mixes-slider");

slider.addEventListener("click", () =>{
    console.log("pushing")




   
})

   
});

