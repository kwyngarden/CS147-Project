var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
  if(req.session.username) {
    res.redirect('/home');
    return;
  }
  if(!req.session.lastPage) {
    req.session.lastPage = '/login';
  }
  var lastPage = req.session.lastPage;
  res.render('login', {
    'lastPage': lastPage,
    'username': req.session.username,
  });
};

// Basic login and logout using express-sessions

exports.login = function(req, res) {
  // remember the username
  var lastPage = req.session.lastPage;
  var username = req.body.username;
  var password = req.body.password;
  if(!req.session.lastPage) {
    req.session.lastPage = '/';
  }

  if(!username || !password) {
    res.render('login', {
      'lastPage': lastPage,
      'username': req.session.username,
      'message': 'You must enter a username and password to login.'
    });
    return;
  }

  var hash = hashCode(password);
  req.session.username = username;
  models.User.findOne({'username': username})
             .exec(createUser);

  function createUser(err, user){
    if (err) {console.log(err); res.send(500);}
    
    // Handle account creation
    if (!user) {
      var newUser = new models.User({'username': username, 
                                    'passwordHash': hash, 
                                    'favorites':[],
                                    'pageVersion': req.session.pageVersion,
                                    'numFavEvents': 0
                                    });
      //console.log(newUser);
      newUser.save(function(err){
        if (err) console.log(err);
        if(req.session.lastPage) {
          res.redirect(req.session.lastPage);
        } else {
          res.redirect('/');
        }
      });
    }
    
    // Handle user login validation
    else {
      //console.log("comparing " + password + "->" + hash + " to stored hash: " + user.passwordHash);
      if(user.passwordHash != hash) {
        //console.log('password error; re-rendering login page');
        res.render('login', {
          'lastPage': lastPage,
          'username': req.session.username,
          'message': 'Incorrect password. Please try again.'
        });
      } else if(req.session.lastPage) {
        res.redirect(req.session.lastPage);
      } else {
        res.redirect('/');
      }

    }
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

function hashCode(str){ // Simple string hashcode function
    var hash = 0, i, char;
    if (str.length == 0) return hash;
    for (i = 0, l = str.length; i < l; i++) {
        char  = str.charCodeAt(i);
        hash  = ((hash<<5)-hash)+char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};