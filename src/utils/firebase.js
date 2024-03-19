import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore";
import { FirestoreAPI } from "./firestore";

const firebaseConfig = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_FIREBASE_APP_ID,
    measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

let app
let auth
let db
let getUser = () => false;
let createUser = () => false;
let updateUser = (user_id, data) => false;
let getTradeAds = () => false;
let addTradeAd = (user_id, data) => false;

if (typeof window !== "undefined") {
    app = app || initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    getUser = user_id => FirestoreAPI.getUser(db, user_id);
    createUser = user_id => FirestoreAPI.createUser(db, user_id)
    updateUser = (user_id, data) => FirestoreAPI.updateUser(db, user_id, data)
    getTradeAds = user_id => FirestoreAPI.getTradeAds(db);
    addTradeAd = (user_id, data) => FirestoreAPI.addTradeAd(db, user_id, data);
}

export {
    auth,
    onAuthStateChanged,
    db,
    getUser,
    createUser,
    updateUser,
    getTradeAds,
    addTradeAd
};
