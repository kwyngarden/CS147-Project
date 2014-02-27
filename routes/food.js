
/*
 * GET map page.
 */

var data = require('../data.json');
var models = require('../models');
var ObjectId = require('mongoose').Types.ObjectId;

exports.upvote = function(req, res) {
	var name = req.params.name;
	var dhall = req.params.dhall;
	var number = req.params.number;
	var username = req.session.username;
	models.User
		  .findOne({'username': username})
		  .exec(callbackOne);
	
	function callbackOne(err, user) {
		if (err) {console.log(err); res.send(500)}
		// Update MenuItem to include upvotes and new upvoter
		models.MenuItem
		  	  .update({'name': name, 'dining_hall': dhall},
		  	  		  {'upvotes': number, $push: {'upvoters': user._id}},
		  	  		  callbackTwo);

		// Remove downvote and downvoter records if user previously downvoted
		function callbackTwo(err) {
			models.MenuItem
				  .findOne({'name': name, 'dining_hall': dhall})
				  .populate('downvoters')
				  .exec(callbackThree);

			function callbackThree(err, menuItem){
				var userId = user._id;
				var downvoters = menuItem.downvoters;
				for (var i=0; i<downvoters.length; i++) {
					if (downvoters[i]._id.toString() == userId) {
						menuItem.update({$inc: {'downvotes': -1}, $pull: {'downvoters': userId}},
									function(err){
										models.MenuItem.findOne({'name':name, 'dining_hall':dhall})
											.exec(function(err, m){
												console.log(m);
											});
									});
					}
				}
				res.send(200);
			}
		}
	}
};

exports.downvote = function(req, res) {
	var name = req.params.name;
	var dhall = req.params.dhall;
	var number = req.params.number;
	var username = req.session.username;

	models.User
		  .findOne({'username': username})
		  .exec(callbackOne);
	
	function callbackOne(err, user) {
		if (err) {console.log(err); res.send(500)}
		// Update MenuItem to include downvotes and new downvoter
		models.MenuItem
		  	  .update({'name': name, 'dining_hall': dhall},
		  	  		  {'downvotes': number, $push: {'downvoters': user._id}},
		  	  		  callbackTwo);

		// Remove upvote and upvoter records if user previously upvoted
		function callbackTwo(err) {
			models.MenuItem
				  .findOne({'name': name, 'dining_hall': dhall})
				  .populate('upvoters')
				  .exec(callbackThree);

			function callbackThree(err, menuItem){
				var userId = user._id;
				var upvoters = menuItem.upvoters;
				for (var i=0; i<upvoters.length; i++) {
					if (upvoters[i]._id.toString() == userId) {
						menuItem.update({$inc: {'upvotes': -1}, $pull: {'upvoters': userId}},
									function(err){
										models.MenuItem.findOne({'name':name, 'dining_hall':dhall})
											.exec(function(err, m){
												console.log(m);
											});
									});
					}
				}
				res.send(200);
			}
		}
	}
};

exports.view = function(req, res){
    var lastPage = req.session.lastPage;
    req.session.lastPage = '/food/'+encodeURIComponent(req.params.dhall)+"/"+req.params.name;
    var name = req.params.name;
    var dhall = req.params.dhall;
    var username = req.session.username;
    var upvoted = false;
    var downvoted = false;
    var favorited = false;

    models.MenuItem
          .findOne({'name': name, 'dining_hall': dhall})
		  .exec(function(err, menuItem) {
		  		// Find user and see if he's downvoted, 
		  		// upvoted, or favorited it before
		  		if (username){
			  		models.User
			  			  .findOne({'username': username})
			  			  .exec(function(err, user) {
			  			  	var userId = user._id;
			  			  	var menuItemId = menuItem._id;

			  			  	// Iterate through downvoters
			  			  	for (var i=0; i<menuItem.downvoters.length; i++) {
			  			  		if (menuItem.downvoters[i].toString() == userId) {
			  			  			downvoted = true;
			  			  			break;
			  			  		}
			  			  	}

			  			  	// Iterate through upvoters
			  			  	for (var i=0; i<menuItem.upvoters.length; i++) {
			  			  		if (menuItem.upvoters[i].toString() == userId) {
				  			  		upvoted = true;
				  			  		break;
			  			  		}
			  			  	}
			  			  	
			  			  	// Iterate through favorites
			  			  	for (var i=0; i<user.favorites.length; i++) {
			  			  		if (user.favorites[i].toString() == menuItemId) {
			  			  			favorited = true;
			  			  			break;
			  			  		}
			  			  	}

			  			  	res.render('food', {
							  'lastPage': lastPage,
							  'username': req.session.username,
							  'hall': dhall,
							  'menuItem': menuItem,
							  'downvoted': downvoted,
							  'upvoted': upvoted,
							  'favorited': favorited
							});
			  			  });
			  	} else {
			  		res.render('food', {
					  'lastPage': lastPage,
					  'username': req.session.username,
					  'hall': dhall,
					  'menuItem': menuItem,
					  'downvoted': downvoted,
					  'upvoted': upvoted
					});
			  	}
		   });
};
