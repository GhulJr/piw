import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBA3jhnBtJauFWFbPf-AdjIvDSfJ5WRZrU",
    authDomain: "tindeririri.firebaseapp.com",
    databaseURL: "https://tindeririri-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tindeririri",
    storageBucket: "tindeririri.appspot.com",
    messagingSenderId: "320964219649",
    appId: "1:320964219649:web:c62c2bada7edf89e84c100"
  };


  const fb = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  export default fb;