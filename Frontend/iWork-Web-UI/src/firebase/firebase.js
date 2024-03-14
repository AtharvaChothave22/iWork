// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHAadKHJNEYuloAeRf48REw0Cb8jOcRQw",
  authDomain: "freelancing-b4273.firebaseapp.com",
  projectId: "freelancing-b4273",
  storageBucket: "freelancing-b4273.appspot.com",
  messagingSenderId: "319687030515",
  appId: "1:319687030515:web:8bfc8179825b005505e986",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var storage = getStorage();

export default storage;
