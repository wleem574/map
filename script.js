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

// Google Maps Initialization
let map;
function initMap() {
    const userLocation = { lat: -34.397, lng: 150.644 }; // Default location
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 10,
    });

    // Marker for Technician (Example)
    const technicianMarker = new google.maps.Marker({
        position: { lat: -34.5, lng: 150.7 },
        map: map,
        title: "Technician Location",
    });
}
