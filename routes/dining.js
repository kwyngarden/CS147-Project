
/*
 * GET dining hall page.
 */

exports.view = function(req, res){
  var hallName = req.params.name;
  res.render('dining', {
  	'hallName': hallName,
  	'menuItems': [
  		{'itemName': 'Hi'},
  		{'itemName': 'Hi'},
  		{'itemName': 'Hi'},
  		{'itemName': 'Hi'},
  		{'itemName': 'Hi'},
  		{'itemName': 'Hi'},
  	]
  });
};