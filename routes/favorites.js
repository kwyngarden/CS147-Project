var data = require('../data.json');

exports.view = function(req, res){
  req.session.lastPage = '/favorites';

  res.render('favorites', {
    'username': req.session.username,
    "favorites": req.session.favorites
  });
};
