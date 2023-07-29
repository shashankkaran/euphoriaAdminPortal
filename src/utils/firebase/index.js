import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {

    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID
    apiKey: "AIzaSyCSrMWUnTQ8tj_T0QLHHDOqwgHQirVOiCk",
  authDomain: "auth-856ff.firebaseapp.com",
  projectId: "auth-856ff",
  storageBucket: "auth-856ff.appspot.com",
  messagingSenderId: "923321064950",
  appId: "1:923321064950:web:9d22a84095bf636463bbd7",
  measurementId: "G-J0LMTW1W5C"
   
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth();

export { db, auth }
