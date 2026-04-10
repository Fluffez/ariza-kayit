// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyCXqGCyJwHo4lptTrgxWwdB83wv2vN1vwM",
    authDomain: "dosemealti-adf4c.firebaseapp.com",
    databaseURL: "https://dosemealti-adf4c-default-rtdb.firebaseio.com",
    projectId: "dosemealti-adf4c",
    storageBucket: "dosemealti-adf4c.firebasestorage.app",
    messagingSenderId: "650450960110",
    appId: "1:650450960110:web:0acd49cbbf20b9e53a7dff",
    measurementId: "G-CHLJDVVL10"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
