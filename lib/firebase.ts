import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Replace with your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCceO_iYahE2ScWHikqBdE6kgOzbaDzBFg",
  authDomain: "taotechingpt.firebaseapp.com",
  projectId: "taotechingpt",
  storageBucket: "taotechingpt.appspot.com",
  messagingSenderId: "408955299036",
  appId: "1:408955299036:web:e335527eecba9a25e64019",
  measurementId: "G-QPPS693P4T"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV === 'development') {
  firebase.auth().useEmulator('http://localhost:9099/');
  firebase.firestore().useEmulator('localhost', 8080);
  firebase.storage().useEmulator('localhost', 9199);
}

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, googleProvider, firestore, storage};
