
/*
 * GET map page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  req.session.lastPage = '/map';
  res.render('map', {
    'halls': data['halls'],
    'username': req.session.username
  });
};