
/*
 * GET dining hall page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/dining/'+encodeURIComponent(req.params.name);
  var hallName = req.params.name;
  var menu;
  var weekdayHours;
  var weekendHours;
  
  for (var i=0; i<data["halls"].length; i++) {
    if (data["halls"][i]["name"] == hallName) {
      menu = data["halls"][i]["menu"];
      weekdayHours = data["halls"][i]["hours"]["weekdays"];
      weekendHours = data["halls"][i]["hours"]["weekends"];
    }
  }

  // for (var i = 0; i < data[])
  res.render('dining', {
    'lastPage': lastPage,
    'username': req.session.username,
  	'hallName': hallName,
  	'menu': menu,
  	'weekdayHours':weekdayHours,
  	'weekendHours': weekendHours
  });
};