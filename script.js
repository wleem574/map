// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase config object (Replace with your Firebase configuration)
const firebaseConfig = {
  apiKey: "AIzaSyBMa1ZBBH6Xdi-MqqG4-B8z2oBtOzb3MfA",
  authDomain: "drnfeez-c4037.firebaseapp.com",
  databaseURL: "https://drnfeez-c4037-default-rtdb.firebaseio.com",
  projectId: "drnfeez-c4037",
  storageBucket: "drnfeez-c4037.firebasestorage.app",
  messagingSenderId: "912450814298",
  appId: "1:912450814298:web:2c1cd95abbda31e3a4b363"
};
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Mapbox Configuration
mapboxgl.accessToken = 'pk.eyJ1Ijoid2xlZW01NzQiLCJhIjoiY200OWd1MTllMDlsZDJycjZiMjd3enRoMyJ9.gXzkkWVGxyct5EtwDnZ1NA';

// Create Map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [44.361488, 33.315241],
    zoom: 13
});

// Add user location control
const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
});
map.addControl(geolocateControl);

// Authentication
document.getElementById('loginBtn').addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`مرحبًا، ${result.user.displayName}`);
    } catch (error) {
        console.error("Error during login:", error);
    }
});

// Handle "Request Service" button click
document.getElementById('requestService').addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) {
        alert('يرجى تسجيل الدخول أولاً');
        return;
    }

    const center = map.getCenter();
    const requestData = {
        latitude: center.lat,
        longitude: center.lng,
        uid: user.uid,
        userName: user.displayName || "مستخدم مجهول",
        timestamp: new Date().toISOString()
    };

    try {
        const docRef = await addDoc(collection(db, "service_requests"), requestData);
        alert(`تم طلب الصيانة بنجاح! معرّف الطلب: ${docRef.id}`);
    } catch (error) {
        console.error("Error saving request:", error);
        alert("حدث خطأ أثناء طلب الصيانة.");
    }
});
