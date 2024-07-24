mapboxgl.accessToken = 'pk.eyJ1IjoidG9ycml4byIsImEiOiJjbHl6NWt1ZXQwYmJ5MmltdDkxYzJ1MjgxIn0.TlttofPkrh4IvxEvX8EPRg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0], // Starting position [lng, lat]
    zoom:0,  // Starting zoom
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
});

map.on('style.load', () => {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;

    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
    );
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