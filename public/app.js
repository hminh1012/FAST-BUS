import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getStorage, ref, getDownloadURL, getMetadata } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQJRIN-Q_Gn3QpHJU22cnXT077TG8k24I",
    authDomain: "maps-8f948.firebaseapp.com",
    databaseURL: "https://maps-8f948-default-rtdb.firebaseio.com",
    projectId: "maps-8f948",
    storageBucket: "maps-8f948.firebasestorage.app",
    messagingSenderId: "1076952163540",
    appId: "1:1076952163540:web:acd948cf53d2e07794c741",
    measurementId: "G-78QZ1QPEEH"
};

const email = 'tranhoangminh675@gmail.com'; // Replace with your user email
const password = 'kuroba12'; // Replace with your user password

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Format date and time
const formatDateTime = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} at ${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

// Authenticate user
const authenticate = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        document.getElementById('date-time').textContent = `Authentication error: ${error.message}`;
        throw error;
    }
};

// Load image and metadata
const loadImageData = async (user) => {
    try {
        const storageRef = ref(storage, 'data/photo.jp');
        const url = await getDownloadURL(storageRef);
        document.querySelector('#img').src = url;

        const metadata = await getMetadata(storageRef);
        document.getElementById('date-time').textContent = formatDateTime(new Date(metadata.timeCreated));
    } catch (error) {
        document.getElementById('date-time').textContent = `Error: ${error.message}`;
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    const user = await authenticate();
    await loadImageData(user);

    document.querySelector('#refreshBtn').addEventListener('click', async () => {
        const user = await authenticate();
        await loadImageData(user);
    });
});