// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZud3Y3t9-GKNcgMPIiQIjYKJ0_1pNoc0",
  authDomain: "fir-practise-d696f.firebaseapp.com",
  projectId: "fir-practise-d696f",
  storageBucket: "fir-practise-d696f.appspot.com",
  messagingSenderId: "975005168532",
  appId: "1:975005168532:web:2c28b5056f698bc6905581"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();