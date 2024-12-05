// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase config object (Replace with your Firebase configuration)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Mapbox Configuration
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

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
