
/*
 * GET map page.
 */

var data = require('../data.json')

exports.view = function(req, res){
    req.session.lastPage = '/food/'+encodeURIComponent(req.params.dhall)+"/"+req.params.name;
    var name = req.params.name;
    var dhall = req.params.dhall;
    var menuItem;

    for (var i=0; i<data["halls"].length; i++) {
    	if (data["halls"][i]["name"] == dhall) {
    		for (var j=0; j<data["halls"][i]["menu"].length; j++) {
    			if (data["halls"][i]["menu"][j]["name"] == name) {
    				menuItem = data["halls"][i]["menu"][j];
    				console.log(menuItem);
    				break;
    			}
    		}
    	}
    }

  res.render('food', {
  	'username': req.session.username,
  	'menuItem': menuItem
  });
};
