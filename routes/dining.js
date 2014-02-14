
/*
 * GET dining hall page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  var hallName = req.params.name;
  var menu;
  var hours;
  for (var i=0; i<data["menuItems"].length; i++) {
  	if (data["menuItems"][i]["dining_hall"] == hallName) {
  		menu = data["menuItems"][i]["menu"];
  		console.log(menu);
  		break;
  	}
  }

  for (var i=0; i<data["halls"].length; i++) { 
  	if (data["halls"][i]["name"] == hallName) {
  		hours = data["halls"][i]["hours"];
  	}
  }
  // for (var i = 0; i < data[])
  res.render('dining', {
  	'hallName': hallName,
  	'menu': menu,
  	'weekdayHours': hours['weekdays'],
  	'weekendHours': hours['weekends']
  });
};