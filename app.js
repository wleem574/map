// تهيئة الخريطة
var map = L.map('map').setView([33.3128, 44.3615], 13); //  بغداد كمثال

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//  متغير لتخزين علامة الموقع
var marker;

//  دالة تحديث الموقع 
function updateLocation(lat, lng) {
  //  إزالة العلامة القديمة إن وجدت
  if (marker) {
    map.removeLayer(marker);
  }

  //  إضافة علامة جديدة
  marker = L.marker([lat, lng]).addTo(map);

  //  تحديث حقل الموقع في النموذج
  document.getElementById("location").value = lat + ", " + lng;

  //  تركيز الخريطة على الموقع الجديد
  map.setView([lat, lng], 13);
}

//  الحصول على موقع المستخدم عند تحميل الصفحة
map.locate({setView: true, maxZoom: 16});

//  معالجة حدث تحديد الموقع
map.on('locationfound', function(e) {
  updateLocation(e.latitude, e.longitude);
});

//  معالجة حدث النقر على الخريطة لتحديد الموقع
map.on('click', function(e) {
  updateLocation(e.latlng.lat, e.latlng.lng);
});


//  دالة إرسال طلب الصيانة
function sendRequest() {
  var location = document.getElementById("location").value;
  var type = document.getElementById("type").value;
  var description = document.getElementById("description").value;

  //  هنا يجب إرسال هذه البيانات إلى خادم  (مثال باستخدام  fetch API)
  fetch('/send-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: location,
      type: type,
      description: description
    })
  })
  .then(response => response.json())
  .then(data => {
    //  معالجة الرد من الخادم  (مثال:  عرض رسالة نجاح)
    alert(data.message); 
  })
  .catch(error => {
    //  معالجة الأخطاء
    console.error('Error:', error);
    alert("حدث خطأ أثناء إرسال الطلب!");
  });
}

//  إضافة مستمع حدث لزر إرسال الطلب
document.getElementById("requestButton").addEventListener("click", sendRequest);
