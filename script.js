mapboxgl.accessToken = 'pk.eyJ1IjoidG9ycml4byIsImEiOiJjbHl6NWt1ZXQwYmJ5MmltdDkxYzJ1MjgxIn0.TlttofPkrh4IvxEvX8EPRg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [110, 30], // Starting position [lng, lat]
    zoom:4,  // Starting zoom
    pitch: 45,
    bearing: -17.6,
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
const churches = [
    {
        name: 'St. John\'s Cathedral',
        coordinates: [114.15975207832996, 22.278784192318067],
        description: 'Hong Kong'
    },
    {
        name: 'Immaculate Heart of Mary Chapel',
        coordinates: [114.15762361624245, 22.28303569549728],
        description: 'Hong Kong'
    },
    {
        name: '嘉諾撒仁愛女修會教堂',
        coordinates: [114.15300662149097, 22.280218101733002],
        description: 'Hong Kong'
    },
    {
        name: 'Rosary Church',
        coordinates: [114.1766105297175, 22.302420757173994],
        description: 'Hong Kong'
    },
    {
        name: 'Saint Mary\'s Cathedral',
        coordinates: [139.7413571, 35.6753388],
        description: 'Tokyo, Japan'
    },
    {
        name: 'Cathedral of the Immaculate Conception',
        coordinates: [121.512416, 25.044057],
        description: 'Taipei, Taiwan'
    },
    {
        name: 'Saint Joseph\'s Church',
        coordinates: [116.406989, 39.928211],
        description: 'Beijing, China'
    },
    {
        name: 'St. Thomas Cathedral Basilica',
        coordinates: [80.290246, 13.044661],
        description: 'Chennai, India'
    },
    {
        name: 'St. Patrick\'s Cathedral',
        coordinates: [73.044097, 19.016831],
        description: 'Karachi, Pakistan'
    },
    {
        name: 'St. Anthony\'s Church',
        coordinates: [80.278473, 6.936477],
        description: 'Colombo, Sri Lanka'
    },
    {
        name: 'Sacred Heart Cathedral',
        coordinates: [106.6923, 10.7778],
        description: 'Ho Chi Minh City, Vietnam'
    },
    {
        name: 'St. Mary\'s Church',
        coordinates: [123.885774, 10.298322],
        description: 'Cebu City, Philippines'
    },
    {
        name: 'St. Dominic\'s Church',
        coordinates: [113.537273, 22.193422],
        description: 'Macau'
    },
    {
        name: 'Holy Rosary Church',
        coordinates: [100.516631, 13.745743],
        description: 'Bangkok, Thailand'
    },
    {
        name: 'St. Mary\'s Cathedral',
        coordinates: [125.5726, 8.9462],
        description: 'Butuan, Philippines'
    },
    {
        name: 'St. Joseph\'s Cathedral',
        coordinates: [105.846508, 21.028511],
        description: 'Hanoi, Vietnam'
    },
    {
        name: 'Our Lady of the Assumption Cathedral',
        coordinates: [126.207893, 6.112614],
        description: 'Davao City, Philippines'
    },
    {
        name: 'St. Ignatius Cathedral',
        coordinates: [121.4737, 31.2304],
        description: 'Shanghai, China'
    },
    {
        name: 'Sacred Heart Cathedral',
        coordinates: [114.276947, 30.554192],
        description: 'Wuhan, China'
    },
    {
        name: 'St. Joseph\'s Cathedral',
        coordinates: [120.9605, 14.7566],
        description: 'Zamboanga City, Philippines'
    },
    {
        name: 'Our Lady of Guadalupe Shrine',
        coordinates: [121.13614343100862,14.174305358830328],
        description: 'Laguna, Philippines'
    },
    {
        name: 'Minor Basilica of San Lorenzo Ruiz',
        coordinates: [120.9758, 14.5955],
        description: 'Manila, Philippines'
      },
      {
        name: 'Sé Cathedral of Santa Catarina',
        coordinates: [73.8290, 15.5009],
        description: 'Goa, India'
      },
      {
        name: 'Myeongdong Cathedral',
        coordinates: [126.9873, 37.5634],
        description: 'Seoul, South Korea'
      },
      {
        name: 'St. Joseph\'s Cathedral',
        coordinates: [103.8520, 1.2974],
        description: 'Singapore'
      },
      {
        name: 'Our Lady of La Vang Basilica',
        coordinates: [107.4833, 16.5500],
        description: 'Quảng Trị Province, Vietnam'
      },
      {
        name: 'Nagasaki Basilica',
        coordinates: [129.8736, 32.7425],
        description: 'Nagasaki, Japan'
      },
      {
        name: 'Cathedral of the Good Shepherd',
        coordinates: [103.8512, 1.2967],
        description: 'Singapore'
      },
      {
        name: 'Basilica of Our Lady of Sheshan',
        coordinates: [121.1836, 31.0969],
        description: 'Shanghai, China'
      },
      {
        name: 'Basilica of Bom Jesus',
        coordinates: [73.9128, 15.5009],
        description: 'Goa, India'
      },
      {
        name: 'Nha Tho Duc Ba Saigon',
        coordinates: [106.6990, 10.7798],
        description: 'Ho Chi Minh City, Vietnam'
      },
      {
        name: 'Manila Cathedral',
        coordinates: [120.9758, 14.5911],
        description: 'Manila, Philippines'
      },
      {
        name: 'Immaculate Conception Cathedral',
        coordinates: [120.9822, 14.5908],
        description: 'Manila, Philippines'
      },
      {
        name: 'St. Joseph\'s Church',
        coordinates: [103.8546, 1.2971],
        description: 'Singapore'
      },
      {
        name: 'Oura Church',
        coordinates: [129.8739, 32.7328],
        description: 'Nagasaki, Japan'
      },
      {
        name: 'St. Francis Xavier Church',
        coordinates: [114.1694, 22.2783],
        description: 'Hong Kong'
      },
      {
        name: 'The Church of Our Lady of Lourdes',
        coordinates: [104.72324318817022,31.473656782477036],
        description: 'China'
      },
      {
        name: 'The Church of Our Lady of Lourdes',
        coordinates: [104.72324318817022,31.473656782477036],
        description: 'China'
      },
      {
        name:'St Anthony Ham Long Church',
        coordinates: [105.85357532328578,21.018797458707272],
        description: 'China'
      }
    // Add more data points here
];

// Add markers to the map
churches.forEach(church => {
    new mapboxgl.Marker({color: '#FF5733'})
        .setLngLat(church.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${church.name}</h3><p>${church.description}</p>`))
        .addTo(map);
});
