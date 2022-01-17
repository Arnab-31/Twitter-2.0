import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDnXkGJied1PkgI8ZS7ANxAiJF2qlTEbiQ",
    authDomain: "twitter-clone-2cef3.firebaseapp.com",
    projectId: "twitter-clone-2cef3",
    storageBucket: "twitter-clone-2cef3.appspot.com",
    messagingSenderId: "1026420265091",
    appId: "1:1026420265091:web:230e08f1e4f09ee9734bb6"
};



// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };