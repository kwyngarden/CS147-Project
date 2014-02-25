
/*
 * GET map page.
 */

var data = require('../data.json')

exports.view = function(req, res){
    var lastPage = req.session.lastPage;
  req.session.lastPage = '/map';
  res.render('map', {
    'lastPage': lastPage,
    'halls': data['halls'],
    'username': req.session.username
  });
};