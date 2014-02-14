
/*
 * GET home page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  res.render('index', {
    'halls': data['halls'],
    'menuItems': data['menuItems']
  });
};

exports.search = function(req, res) {
    var text = req.params.searchtext;
    console.log(text);
    res.json({
        "searchtext": text
    });
};