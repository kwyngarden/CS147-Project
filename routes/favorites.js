var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  var username = req.session.username;
  req.session.lastPage = '/favorites';

  if (username) {
    models.User.findOne({'username': username}, callbackOne);
  }

  var favoritesArr = [];

  function callbackOne(err, user) {
    var favorites = user.favorites;
    var numLeft = favorites.length;
    for (var i=0; i<favorites.length; i++) {
        models.MenuItem.findOne({'_id': favorites[i].toString()}, callbackTwo);
    }

    function callbackTwo(err, menuItem) {
        models.MenuItem.find()
                       .exec(callbackThree);
        
        function callbackThree(err, items) {
            var dining_halls = [];
            for (var i=0; i<items.length; i++) {
                if (items[i].name == menuItem.name) {
                    var hall = items[i].dining_hall;
                    if (dining_halls.indexOf(hall) < 0) {
                        dining_halls.push(hall);
                    }
                }
            }
            favoritesArr.push({
                'name': menuItem.name,
                'dining_halls': dining_halls,
                'favorited_hall': menuItem.dining_hall
            });
            numLeft--;

            if (numLeft == 0) {
                res.render('favorites', {
                    'lastPage': lastPage,
                    'username': username,
                    'favorites': favoritesArr
              });
            }
        }
    }
  }
};

exports.addFavorite = function(req, res) {
    var username = req.session.username;
    var itemName = req.body.name;
    var hall = req.body.hall;

    models.User
          .findOne({'username': username})
          .exec(callbackOne);

    function callbackOne(err, user) {
        models.MenuItem
              .findOne({'name': itemName, 'dining_hall': hall})
              .exec(callbackTwo);

        function callbackTwo(err, menuItem) {
            var favorites = user.favorites;
            var containsItem = false;
            for (var i=0; i<favorites.length; i++) {
                if (favorites[i].toString() == menuItem._id) {
                    containsItem = true;
                    break;
                }
            }

            if (!containsItem) {
                user.update({$push: {'favorites': menuItem._id}, 
                            $inc: {'numFavEvents': 1}}, callbackThree);
            }

            function callbackThree(err) {
                menuItem.update({$inc: {'favorites': 1}}, callbackFour);

                function callbackFour(err) {
                    models.User.findOne({'username': username}, function(err, m){console.log(m)});
                    //models.MenuItem.findOne({'name': itemName, 'dining_hall': hall}, function(err, n){console.log(n)});
                    res.send(200);
                }
            }
        }
    }
};

exports.removeFavorite = function(req, res) {
    var username = req.session.username;
    var itemName = req.body.name;
    var hall = req.body.hall;

    models.User
          .findOne({'username': username})
          .exec(callbackOne);

    function callbackOne(err, user) {
        models.MenuItem
              .findOne({'name': itemName, 'dining_hall': hall})
              .exec(callbackTwo);

        function callbackTwo(err, menuItem) {
            var favorites = user.favorites;
            var containsItem = false;
            for (var i=0; i<favorites.length; i++) {
                if (favorites[i].toString() == menuItem._id) {
                    containsItem = true;
                    break;
                }
            }

            if (containsItem) {
                user.update({$pull: {'favorites': menuItem._id}}, callbackThree);
            }

            function callbackThree(err) {
                menuItem.update({$inc: {'favorites': -1}}, callbackFour);

                function callbackFour(err) {
                    models.User.findOne({'username': username}, function(err, m){console.log(m)});
                    models.MenuItem.findOne({'name': itemName, 'dining_hall': hall}, function(err, n){console.log(n)});
                    res.send(200);
                }
            }
        }
    }
};

function getHalls(name) {
    // return partial names, e.g. "Arrillaga", "Ricker"
    var matches = [];
    var halls = data.halls;

    for(var i = 0; i < halls.length; i++) {
        var menu = halls[i].menu;
        for(var j = 0; j < menu.length; j++) {
            if(menu[j].name === name) {
                matches.push(halls[i].name);
                break;
            }
        }
    }

    return matches;
}