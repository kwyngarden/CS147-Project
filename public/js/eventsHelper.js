function getFreeFood(){

	$.get('/events/getFreeFood', function(responseHTML) {



// 		var rawHtml = responseHTML;
// 		var myRegExp = new RegExp("<tr class=\"event_overview\">(.*?)</tr>");
// 		console.log(myRegExp);
// //		var myRegExp = new RegExp(".*");
// 		console.log(rawHtml);
// 		var matches = rawHtml.match(myRegExp);
// 		if (matches){
// 			console.log("success");
// 			for(var i=0; i<matches.length; i++) 
// 			{
// 			  alert(matches[i]);
// 			}
// 		}
// 		else{
// 			console.log("fail");
// 		}



		// console.log(responseHTML);
	});
}