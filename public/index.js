// Import Firebase SDKs
import { indexedDBLocalPersistence } from "firebase/auth/web-extension";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submission
document.getElementById('dataForm').addEventListener('submit', function(event) {
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
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

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
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; // Loop to the first image after the last
    updateImage();
});

// Event listener for the "Previous" button
prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop to the last image after the first
    updateImage();
});

// Initialize the first image
updateImage();