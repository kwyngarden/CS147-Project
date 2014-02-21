var data = require('../data.json')

exports.view = function(req, res){
  res.render('login', {
    'username': req.session.username,
  });
};

// Basic login and logout using express-sessions

exports.login = function(req, res) {
  // remember the username
  var username = req.query.username;
  console.log('username is: '+username);
  req.session.username = username;
  req.session.favorites = [];

  if(req.session.lastPage) {
    res.redirect(req.session.lastPage);
  } else {
    res.redirect('/');
  }
}

exports.logout = function(req, res) {
  req.session.username = null;
  req.session.favorites = [];

  if(req.session.lastPage) {
    res.redirect(req.session.lastPage);
  } else {
    res.redirect('/');
  }
}