
/*
 * GET map page.
 */

var data = require('../data.json');
var models = require('../models');

exports.upvote = function(req, res) {
	var name = req.params.name;
	var dhall = req.params.dhall;
	var number = req.params.number;
	models.MenuItem
		  .findOneAndUpdate({'name': name, 'dining_hall': dhall},
							{'upvotes': number},
							function(err, menuItem) {
								console.log(menuItem.upvotes);
							 	res.send(200);
							});
};

exports.downvote = function(req, res) {
	var name = req.params.name;
	var dhall = req.params.dhall;
	var number = req.params.number;
	models.MenuItem
		  .findOneAndUpdate({'name': name, 'dining_hall': dhall},
							{'downvotes': number},
		  					function(err, menuItem) {
		  						console.log(menuItem.upvotes);
		  						res.send(200);
		  					});
};

exports.view = function(req, res){
    var lastPage = req.session.lastPage;
    req.session.lastPage = '/food/'+encodeURIComponent(req.params.dhall)+"/"+req.params.name;
    var name = req.params.name;
    var dhall = req.params.dhall;

    models.MenuItem
          .findOne({'name': name, 'dining_hall': dhall})
		  .exec(function(err, menuItem) {
		   		res.render('food', {
				  'lastPage': lastPage,
				  'username': req.session.username,
				  'hall': dhall,
				  'menuItem': menuItem
				});
		   });
};
