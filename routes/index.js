
/*
 * GET home page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  res.render('index', {
    'halls': data['halls'],
    'menu': data['menuItems']
  });
};