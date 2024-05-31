
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import 'firebase/auth'
import { getStorage } from "firebase/storage";
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBPDycqllIv0300wsm3u5XPjWxsSXmwXjs",
  authDomain: "olx-clone-60c68.firebaseapp.com",
  projectId: "olx-clone-60c68",
  storageBucket: "olx-clone-60c68.appspot.com",
  messagingSenderId: "73543857166",
  appId: "1:73543857166:web:d5de3bbf6c28276d1ff85f",
  measurementId: "G-5XTTP20XPK"
};
 

  
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const storage = getStorage();