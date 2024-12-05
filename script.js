// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMa1ZBBH6Xdi-MqqG4-B8z2oBtOzb3MfA",
  authDomain: "drnfeez-c4037.firebaseapp.com",
  databaseURL: "https://drnfeez-c4037-default-rtdb.firebaseio.com",
  projectId: "drnfeez-c4037",
  storageBucket: "drnfeez-c4037.firebasestorage.app",
  messagingSenderId: "912450814298",
  appId: "1:912450814298:web:2c1cd95abbda31e3a4b363"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login Functionality
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('service-section').style.display = 'block';
        })
        .catch((error) => alert(error.message));
});

// Submit Service Request
document.getElementById('submit-request').addEventListener('click', () => {
    const serviceType = document.getElementById('service-type').value;
    const description = document.getElementById('problem-description').value;
    const user = auth.currentUser;

    if (user) {
        db.collection('serviceRequests').add({
            userId: user.uid,
            serviceType: serviceType,
            description: description,
            status: 'pending',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('Service Request Submitted!');
        }).catch((error) => alert(error.message));
    }
});

// إعداد Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoid2xlZW01NzQiLCJhIjoiY200OWd1MTllMDlsZDJycjZiMjd3enRoMyJ9.gXzkkWVGxyct5EtwDnZ1NA'; // ضع مفتاح Mapbox API الخاص بك هنا

// تهيئة الخريطة
document.addEventListener('DOMContentLoaded', () => {
    const map = new mapboxgl.Map({
        container: 'map', // معرف العنصر HTML
        style: 'mapbox://styles/mapbox/streets-v11', // نوع الخريطة
        center: [54.3773, 24.4539], // إحداثيات الموقع الافتراضي (أبوظبي كمثال)
        zoom: 10 // مستوى التكبير الافتراضي
    });

    // إضافة Marker لموقع العميل
    const userMarker = new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([54.3773, 24.4539]) // إحداثيات العميل
        .addTo(map);

    // إضافة Marker لموقع الفني
    const technicianMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([54.3745, 24.4602]) // إحداثيات الفني
        .addTo(map);

    // التحكم في عرض الخريطة
    map.on('load', () => {
        console.log('Map Loaded!');
    });
});
