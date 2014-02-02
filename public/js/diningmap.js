/* Script to handle Google Map displaying dining halls
 * See documentation at:
 * https://developers.google.com/maps/documentation/javascript/markers
 * Labeled markers library: http://stackoverflow.com/questions/11043587/google-maps-api-v3-marker-with-label
 */

var map; // google.maps.Map object set to use the 'map-canvas' div
var markers; // Hash of arrays of markers to display on map
var imageDirectory = "../images/"; // Image directory in a node project
var markerDimensions = 30; // Width/height of icons (assumed square TODO)
var zIndex = 0; // incremented to control drawing order

var markerData = [
  {"name": "Arrillaga Family Dining Commons", "latitude": 37.425448, "longitude": -122.164251},
  {"name": "Ricker Dining", "latitude": 37.425604, "longitude": -122.180428}
];
var defaultIconFilename = "dining.png";

// Initialize Google map in the div marked as 'map-canvas'
function initialize() {
  var centerLatLng = new google.maps.LatLng(37.427449, -122.170308); // Stanford quad
  var mapOptions = {
    zoom: 15,
    center: centerLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  markers = [];

  // Try W3C geolocation
  /*
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      mapOptions['center'] = initialLocation;
    }, function() {} );
  }
  */
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);
  loadMarkerData();
}

function loadMarkerData() {
  for(var i = 0; i < markerData.length; i++) {
    var currMarker = markerData[i];
    var marker = newMarker(currMarker.name, currMarker["latitude"], currMarker["longitude"]);
    markers.push(marker);
  }
}

function newMarker(name, lat, lng) {
  var icon = {
    url: imageDirectory + defaultIconFilename,
    scaledSize: new google.maps.Size(30, 30)
  };
  var myLatLng = new google.maps.LatLng(lat, lng);



  // Set information window
  var infowindow = new google.maps.InfoWindow({
      content: name
  });

  // Create marker (adds to map)
  var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        //icon: icon, // Image marker on map.
        title: name, // TODO: tooltip doesn't show up
        //shape: shape,
        zIndex: zIndex
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
  zIndex++;
  return marker;
}
// Can change visibility of marker with marker.setVisible(true/false), eg if dining hall is closed


// Implementation of Haversine formula. Returns distance between two points in miles.
function distanceBetween(latLng1, latLng2) {
  return distanceBetweenCoords(latLng1[0], latLng1[1], latLng2[0], latLng2[1]);
}
function distanceBetweenCoords(lat1, long1, lat2, long2) {
  var dtor = Math.PI/180;
  var r = 3959.0; // Radius in miles

  var rlat1 = lat1 * dtor;
  var rlong1 = long1 * dtor;
  var rlat2 = lat2 * dtor;
  var rlong2 = long2 * dtor;

  var dlon = rlong1 - rlong2;
  var dlat = rlat1 - rlat2;

  var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.pow(Math.sin(dlon/2),2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = r * c;
  return d;
}

// Shapes define the clickable region of the icon.
// The type defines an HTML &lt;area&gt; element 'poly' which
// traces out a polygon as a series of X,Y points. The final
// coordinate closes the poly by connecting to the first
// coordinate.
// var shape = {
//     coord: [1, 1, 1, 20, 18, 20, 18 , 1],
//     type: 'poly'
// };

// function loadScript() {
//   var script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
//       'callback=initialize';
//   document.body.appendChild(script);
// }

// $(document).ready(initialize);