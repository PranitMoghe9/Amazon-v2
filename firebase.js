// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBNXnGLzTrFxch97et2PnC3yI5GOrljElM",
  authDomain: "clone-6c279.firebaseapp.com",
  projectId: "clone-6c279",
  storageBucket: "clone-6c279.appspot.com",
  messagingSenderId: "811528166861",
  appId: "1:811528166861:web:2e44204dc77203d8263884",
  measurementId: "G-S7PP3R6CXH",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebase.firestore();
export default db;
