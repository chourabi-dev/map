
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hvdXJhYmlkZXYiLCJhIjoiY2t5ZGVzdTQ1MDExczJ2bHVpYWl0YzFzOCJ9.qjzOWUjgdAE-K8dJ8y8apA';
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true // Lazy load the plugin
    );
    
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [10.10282666, 36.7776446], // starting position [lng, lat]
    zoom: 13,  // starting zoom
    lazy:true,
});

map.on('load', () => {
    map.addSource('earthquakes', {
        
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data.json' //"http://www.aot-testing.gymmy.space/data.json"
    });

    map.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-color': 'blue',
            'circle-stroke-color': 'white'
        }
    });

    //-------------------
    map.addSource('capteurs', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'second-data.json' //"http://www.aot-testing.gymmy.space/data.json"
    });

    map.addLayer({
        'id': 'capteurs-layer',
        'type': 'circle',
        'source': 'capteurs',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }
    });

    map.on('click', 'capteurs-layer', (e) => {
        console.log(e);
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`<p>coordonnées : ${coordinates.toString()} <br/> consommation : 180Kw <br/> intensité: 190 <br/> tension : <br/> 150 <br> facteur de puissance: 12 </p>`)
        .addTo(map);
        });


        map.on('click', 'earthquakes-layer', (e) => {
            console.log(e);
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
             
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
             
            new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<p>coordonnées : ${coordinates.toString()} <br/>  ${new Date().getTime() % 2 == 0 ? '<span class="text-white bg-danger badge">étteinte<span>' : '<span class="text-white bg-success badge">allumé<span>' }  </p>`)
            .addTo(map);
            });

});
