const map = L.map('map').setView([37.0902, -95.7129], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];

coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lon]).addTo(map)
        .bindPopup(`Marker ${index + 1}`).openPopup();

    document.getElementById(`marker${index + 1}-coord`).textContent = `${coord.lat}, ${coord.lon}`;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Locality not found";
            document.getElementById(`marker${index + 1}-locality`).textContent = locality;
        })
        .catch(error => console.error('Error fetching locality:', error));
});
