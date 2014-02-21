
/*
 * GET map page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  res.render('map', {
    'halls': data['halls'],
    'username': req.session.username
  });
};