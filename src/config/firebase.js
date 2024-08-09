import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA--be9FXsXF6eMyxF33wsgxpBa72DZ90s",
    authDomain: "vieiratiago-9228d.firebaseapp.com",
    projectId: "vieiratiago-9228d",
    storageBucket: "vieiratiago-9228d.appspot.com",
    messagingSenderId: "959672915506",
    appId: "1:959672915506:web:f973335f3002bd1517ce2b",
    measurementId: "G-39ZXY8L4NR"
  };
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };