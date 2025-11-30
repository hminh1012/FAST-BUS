import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
