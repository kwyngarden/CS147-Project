var data = require('../data.json');

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/favorites';

  res.render('favorites', {
    'lastPage': lastPage,
    'username': req.session.username,
    'favorites': req.session.favorites
  });
};

exports.addFavorite = function(req, res) {
    if(req.session.username && req.body.name) {
        req.session.favorites.push({
            'name': req.body.name,
            'dining_halls': getHalls(req.body.name)
        });
    }
    console.log("After processing addFavorite("+req.params.name+"):");
    console.log(req.session.favorites);
    res.send(200);
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