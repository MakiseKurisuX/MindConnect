import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2JOuBSfyWz2z96tkXEeEUJu4D3POtNyE",
    authDomain: "mindconnect-218f4.firebaseapp.com",
    projectId: "mindconnect-218f4",
    storageBucket: "mindconnect-218f4.appspot.com",
    messagingSenderId: "444214507037",
    appId: "1:444214507037:web:6fdd17d5a91ea1f1cdb8f4",
    measurementId: "G-DJEVTEG4EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };