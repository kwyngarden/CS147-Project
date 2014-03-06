(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48537417-2', {'cookieDomain':'none'});
ga('send', 'pageview');

// $(document).ready(loadImages);

// function loadImages(){
// 	var foodImageElems = $('.foodImage');
// 	foodImageElems.each(function(index, element) {
// 		var id = element.getAttribute('id');
// 		var queryItem = id.split('_')[1].toLowerCase();
// 		var searchURL = 'https://www.googleapis.com/customsearch/v1?' + 
// 			'q=' + encodeURIComponent(queryItem) + 
// 			'&cx=007705702159888673330:6b26r60qwy0' +
// 			'&key=AIzaSyDX5OMXfxuKOT4Z6juTm5qh2oDD7UTFjnk' + 
// 			'&searchType=image'

// 	    console.log(searchURL);

// 	    $.get(searchURL, showPhotos);

// 	    function showPhotos(data) {
// 		    var photos = data.items;
// 	        var img = $("[id='" + id + "']")[0];
// 	        var matchFound = false;
// 	        for (var i=0; i<photos.length; i++) {
// 	        	var link = photos[i].link;
// 	        }
//         	img.src = link;
// 		}
// 	});
// }


// $(document).ready(loadImages);

// function loadImages(){
// 	var foodImageElems = $('.foodImage');
// 	foodImageElems.each(function(index, element) {
// 		var id = element.getAttribute('id');
// 		var queryItem = id.split('_')[1].toLowerCase();
// 		var searchURL = 'https://secure.flickr.com/services/rest/?' +
// 	      'method=flickr.photos.search&' +
// 	      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
// 	      'text=' + encodeURIComponent(queryItem) + '&' +
// 	      'safe_search=1&' +
// 	      'content_type=1&' +
// 	      'sort=interestingness-desc&' +
// 	      'per_page=20';

// 	     console.log(searchURL);

// 	    function requestPhoto() {
// 	    	var req = new XMLHttpRequest();
// 	    	req.open("GET", searchURL, true);
// 	    	req.onload = showPhotos;
// 	    	req.send(null);
// 	    }

// 	    function constructImageURL(photo) {
// 	    	return "http://farm" + photo.getAttribute("farm") +
// 	        ".static.flickr.com/" + photo.getAttribute("server") +
// 	        "/" + photo.getAttribute("id") +
// 	        "_" + photo.getAttribute("secret") +
// 	        "_s.jpg";
// 	    }

// 	    function showPhotos(e) {
// 		    var photos = e.target.responseXML.querySelectorAll('photo');
// 	        var img = $("[id='" + id + "']")[0];
// 	        var matchFound = false;
// 	        for (var i=0; i<photos.length; i++) {
// 	        	var title = photos[i].getAttribute('title');
// 	        	if (title.toLowerCase().indexOf(queryItem) >= 0) {
// 	        		matchFound = true;
// 	        		break;
// 	        	}
// 	        }
// 	        if (matchFound) {
// 	        	img.src = constructImageURL(photos[i]);
// 	        } else {
// 	        	img.src = "";
// 	        }

// 		    img.setAttribute('alt', photos[i].getAttribute('title'));
// 		}

// 	    requestPhoto();
// 	});
// }
	