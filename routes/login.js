var data = require('../data.json');
var models = require('../models');

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
  req.session.username = username;
  req.session.lastPage = '/';

  models.User.findOne({'username': username})
             .exec(createUser);

  function createUser(err, user){
    if (err) {console.log(err); res.send(500);}
    if (!user) {
      var newUser = new models.User({'username': username, 'favorites':[]});
      newUser.save(function(err){
        if (err) console.log(err);
      });
    }
  }

  if(req.session.lastPage) {
    res.redirect(req.session.lastPage);
  } else {
    res.redirect('/');
  }
}

exports.logout = function(req, res) {
  req.session.username = null;

  if(req.session.lastPage) {
    res.redirect(req.session.lastPage);
  } else {
    res.redirect('/');
  }
}