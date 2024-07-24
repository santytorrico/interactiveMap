mapboxgl.accessToken = 'pk.eyJ1IjoidG9ycml4byIsImEiOiJjbHl6NWt1ZXQwYmJ5MmltdDkxYzJ1MjgxIn0.TlttofPkrh4IvxEvX8EPRg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0], // Starting position [lng, lat]
    zoom: 2 // Starting zoom
});

// Example data for Christian temples and churches
const data = [
    {
        name: 'St. Peter\'s Basilica',
        coordinates: [12.453389, 41.902916],
        description: 'Vatican City'
    },
    {
        name: 'Notre-Dame Cathedral',
        coordinates: [2.349014, 48.853096],
        description: 'Paris, France'
    },
    // Add more data points here
];

// Add markers to the map
data.forEach(point => {
    const marker = new mapboxgl.Marker()
        .setLngLat(point.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${point.name}\n${point.description}`))
        .addTo(map);
});