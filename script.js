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

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// استدعاء خدمات Firebase
const auth = firebase.auth(); // تم نقل هذا التعريف إلى هنا
const db = firebase.firestore(); // تم نقل هذا التعريف إلى هنا

// إعداد مزود تسجيل الدخول باستخدام Google
const provider = new firebase.auth.GoogleAuthProvider();

// إعداد Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoid2xlZW01NzQiLCJhIjoiY200OWd1MTllMDlsZDJycjZiMjd3enRoMyJ9.gXzkkWVGxyct5EtwDnZ1NA';

// إنشاء الخريطة
const map = new mapboxgl.Map({
    container: 'map', // عنصر الخريطة
    style: 'mapbox://styles/mapbox/streets-v12', // النمط
    center: [44.361488, 33.315241], // الموقع الأولي (مثال: بغداد)
    zoom: 13 // مستوى التكبير
});

// إضافة زر تحديد الموقع
const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
});

map.addControl(geolocateControl);

// تسجيل الدخول باستخدام Google
document.getElementById('loginBtn').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then(result => {
            alert(`مرحبًا، ${result.user.displayName}`);
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
});

// طلب صيانة عند الضغط على الزر
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
        const docRef = await db.collection("service_requests").add(requestData);
        alert(`تم طلب الصيانة بنجاح! معرّف الطلب: ${docRef.id}`);
    } catch (error) {
        console.error("Error saving request:", error);
        alert("حدث خطأ أثناء طلب الصيانة.");
    }
});
