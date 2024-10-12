// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACkPUL7KyoKzlKUCIbFAYyf8tY79UlTDg",
  authDomain: "shop-management-system-37409.firebaseapp.com",
  projectId: "shop-management-system-37409",
  storageBucket: "shop-management-system-37409.appspot.com",
  messagingSenderId: "833782051017",
  appId: "1:833782051017:web:2ef0c83eb33d1fea165d18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;