var data = require('../data.json');

exports.view = function(req, res){
  res.render('favorites', {
    'username': req.session.username,
    "favorites": data.favorites
  });
};
