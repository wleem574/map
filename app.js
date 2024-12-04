// توكن Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoid2xlZW01NzQiLCJhIjoiY200OWd1MTllMDlsZDJycjZiMjd3enRoMyJ9.gXzkkWVGxyct5EtwDnZ1NA';

const map = new mapboxgl.Map({
    container: 'map', // id العنصر الذي سيحتوي على الخريطة
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [31.2357, 30.0444], // الإحداثيات الافتراضية (القاهرة)
    zoom: 12
});

// إضافة نقطة للموقع الجغرافي الحالي
let marker;

navigator.geolocation.getCurrentPosition(function(position) {
    const userLng = position.coords.longitude;
    const userLat = position.coords.latitude;

    // مركز الخريطة على موقع المستخدم الحالي
    map.setCenter([userLng, userLat]);

    // إضافة مؤشر الموقع
    marker = new mapboxgl.Marker()
        .setLngLat([userLng, userLat])
        .addTo(map);
    
    document.getElementById('location-info').innerText = `موقعك الحالي: ${userLat.toFixed(4)}, ${userLng.toFixed(4)}`;
});

// إضافة خاصية السماح للمستخدم بتحديد مكان على الخريطة
map.on('click', function(e) {
    const coords = e.lngLat;
    
    if (marker) {
        marker.setLngLat(coords); // تغيير موقع المؤشر
    } else {
        marker = new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(map);
    }

    document.getElementById('location-info').innerText = `موقع طلب الصيانة: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
});

// وظيفة إرسال الطلب
function sendRequest() {
    const location = marker.getLngLat();
    alert(`تم إرسال طلب الصيانة إلى الموقع: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`);
    
    // هنا يمكن إضافة الكود لإرسال الطلب إلى الخادم أو قاعدة البيانات.
}
