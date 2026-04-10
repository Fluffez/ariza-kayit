// Firebase yapılandırması
// Firebase Console'dan alacağınız bilgileri buraya ekleyin
// https://console.firebase.google.com/

const firebaseConfig = {
    apiKey: "BURAYA_API_KEY_EKLEYIN",
    authDomain: "BURAYA_AUTH_DOMAIN_EKLEYIN",
    databaseURL: "BURAYA_DATABASE_URL_EKLEYIN",
    projectId: "BURAYA_PROJECT_ID_EKLEYIN",
    storageBucket: "BURAYA_STORAGE_BUCKET_EKLEYIN",
    messagingSenderId: "BURAYA_MESSAGING_SENDER_ID_EKLEYIN",
    appId: "BURAYA_APP_ID_EKLEYIN"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
