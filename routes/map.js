
/*
 * GET map page.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/map';

  models.Hall
  		.find()
  		.exec(function(err, halls){
  			 res.render('map', {
			    'lastPage': lastPage,
			    'halls': halls,
			    'username': req.session.username
			 });
  		});
};