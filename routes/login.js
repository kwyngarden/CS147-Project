var data = require('../data.json')

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/login';
  res.render('login', {
    'lastPage': lastPage,
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