// استيراد المكتبات المطلوبة من Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, push, serverTimestamp } from "firebase/database";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMa1ZBBH6Xdi-MqqG4-B8z2oBtOzb3MfA",
  authDomain: "drnfeez-c4037.firebaseapp.com",
  databaseURL: "https://drnfeez-c4037-default-rtdb.firebaseio.com",
  projectId: "drnfeez-c4037",
  storageBucket: "drnfeez-c4037.appspot.com",
  messagingSenderId: "912450814298",
  appId: "1:912450814298:web:2c1cd95abbda31e3a4b363"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // المصادقة
const db = getDatabase(app); // قاعدة البيانات Realtime Database

// تسجيل الدخول
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Welcome, ${user.email}`);
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('service-section').style.display = 'block';
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login Failed: " + error.message);
    });
});

// إرسال طلب الخدمة
document.getElementById('submit-request').addEventListener('click', () => {
  const serviceType = document.getElementById('service-type').value;
  const description = document.getElementById('problem-description').value;

  if (!serviceType || !description) {
    alert("Please fill in all fields");
    return;
  }

  const user = auth.currentUser;

  if (user) {
    const requestRef = push(ref(db, 'serviceRequests')); // إنشاء مرجع جديد للطلب
    set(requestRef, {
      userId: user.uid,
      serviceType: serviceType,
      description: description,
      status: 'pending',
      timestamp: serverTimestamp() // إضافة التوقيت من خادم Firebase
    })
      .then(() => {
        alert('Service Request Submitted!');
      })
      .catch((error) => {
        console.error("Error submitting request:", error.message);
        alert("Failed to submit request: " + error.message);
      });
  } else {
    alert("Please login first.");
  }
});
