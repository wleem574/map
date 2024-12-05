// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// إعداد Mapbox
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

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
