let lat = '32.7767';
let lon ='-96.7970';

mapboxgl.accessToken= mapBox_key;
let map;
let geocoder;
let marker;
let popup;
init();
setGeocoderEventListener();


// getWeatherData(lon,lat) //set default

function init(){
    //make the mapbox
    map = new mapboxgl.Map({
        container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lon, lat], // starting position [lng, lat]
            zoom: 5, // starting zoom

    });

    // makes the geocoder
    geocoder = new MapboxGeocoder({
        accessToken: mapBox_key,
        mapboxgl: mapboxgl,
        marker: false
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    // map.addControl(geocoder);

}
//make marker
function getMarker(coordinates){
    return new mapboxgl.Marker({
        draggable: true,
    })
        .setLngLat(coordinates)
        .addTo(map);
}

//drag event
function onDragEnd() {
    const lngLat = marker.getLngLat();
    let lng = lngLat.lng.toFixed(3);
    let lat = lngLat.lat.toFixed(3);
    coordinates.style.display = 'block';
    coordinates.innerHTML = `Longitude: ${lng}<br />Latitude: ${lat}`;

    getWeatherData(lng, lat);
    console.log(lngLat);
}


//get popup
// function  getPopup(description, coordinates){
//     return new mapboxgl.Popup()
//         .setLngLat(coordinates)
//         .setHTML(`<p>${description}</p>`)
//         .addTo(map);
// }

//listen for result
function setGeocoderEventListener() {
    geocoder.on("result", function (e) {
        /*We need to ensure marker/popup variables hoisted at the top actual *have* a value
        * Otherwise, calling a remove() method on a non-existent object will result in a runtime error
        * */
        let newlat = e.result.geometry.coordinates[1];
        let newlon =e.result.geometry.coordinates[0];
        let location = e.result.place_name;

        console.log(e)
        if (marker) {
            marker.remove();
        }
        if (popup) {
            popup.remove();
        }

        /*Finally, set the hoisted marker/popup variables to new respective objects*/
        marker = getMarker(e.result.geometry.coordinates);
        // popup = getPopup(e.result.place_name, e.result.geometry.coordinates);
        mylocation(location);
        getWeatherData(newlon, newlat,);
        onDragEnd();
        marker.on('dragend', onDragEnd);
    });
}

//showing location
function mylocation(location) {
    let head1 = "";
    head1 += `${location}`;
    $('#location').html(head1)
}
//comic sans
$('#sans').dblclick(function (){
    console.log('hello')
    $('body').css({
        "font-family": '"Comic Sans MS", "Comic Sans", cursive',
    })

})








