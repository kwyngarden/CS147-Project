$(document).ready(loadImages);

function loadImages(){
	var foodImageElems = $('.foodImage');
	foodImageElems.each(function(index, element) {
		var id = element.getAttribute('id');
		var queryItem = id.split('_')[1];
		var searchURL = 'https://secure.flickr.com/services/rest/?' +
	      'method=flickr.photos.search&' +
	      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
	      'text=' + encodeURIComponent(queryItem) + '&' +
	      'safe_search=1&' +
	      'content_type=1&' +
	      'sort=interestingness-desc&' +
	      'per_page=20';

	    function requestPhoto() {
	    	var req = new XMLHttpRequest();
	    	req.open("GET", searchURL, true);
	    	console.log(searchURL);
	    	req.onload = showPhotos;
	    	req.send(null);
	    }

	    function constructImageURL(photo) {
	    	return "http://farm" + photo.getAttribute("farm") +
	        ".static.flickr.com/" + photo.getAttribute("server") +
	        "/" + photo.getAttribute("id") +
	        "_" + photo.getAttribute("secret") +
	        "_s.jpg";
	    }

	    function showPhotos(e) {
		    var photos = e.target.responseXML.querySelectorAll('photo');
	        var img = $("[id='" + id + "']")[0];
	        // for (var i=0; i<photos.length; i++) {
	        // 	var title = photos[i]['title'];
	        // 	if (title.indexOf())
	        // }
		    img.src = constructImageURL(photos[1]);
		    img.setAttribute('alt', photos[1].getAttribute('title'));
		}

	    requestPhoto();
	});
}
	  