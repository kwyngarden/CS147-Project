
/*
 * GET map page.
 */

var data = require('../data.json')

exports.view = function(req, res){
var name = req.params.name;
var dhall = req.params.dhall;
var allmenu = data['menuItems'];
var dhallMenu;
console.log(allmenu);
for(var i = 0; i < allmenu.length; i++){
	var currDhall = allmenu[i]["dining_hall"];
	if(currDhall == dhall){
		dhallMenu = allmenu[i]["menu"];
		console.log(dhallMenu);
	}
}
for(var i = 0; i < dhallMenu.length; i++){
	var currDish = dhallMenu[i];
	if(currDish['name'] == name){
		var food_item = dhallMenu[i];
		console.log(food_item);
	}
}
  res.render('food', food_item
  );
};
