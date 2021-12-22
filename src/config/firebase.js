// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkL6zh4eIbM_C0R2PdJ87jye6F3948IZg",
  authDomain: "test-upload-89357.firebaseapp.com",
  projectId: "test-upload-89357",
  storageBucket: "test-upload-89357.appspot.com",
  messagingSenderId: "177776979580",
  appId: "1:177776979580:web:0c3bbd0f6de7cded48e3f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const firestore = getFirestore(app)

export {
    storage,
    firestore
}