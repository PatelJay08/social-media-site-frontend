import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8gV7T6xBbvystT8PGGoABDqLmHgFwwBc",
    authDomain: "social-media-site-f2e7f.firebaseapp.com",
    projectId: "social-media-site-f2e7f",
    storageBucket: "social-media-site-f2e7f.appspot.com",
    messagingSenderId: "605670671296",
    appId: "1:605670671296:web:97f12c5829c72940c8fe25"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth();
const storage=getStorage(app);

export {storage,auth}; 