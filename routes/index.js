
/*
 * GET home page.
 */

var data = require('../data.json')

exports.view = function(req, res){
  var reducedMenuItems = data['menuItems'];
  for (var i=0; i<reducedMenuItems.length; i++) {
  	reducedMenuItems[i]['menu'] = reducedMenuItems[i]['menu'].slice(0, 2)
  }
  res.render('index', {
    'halls': data['halls'],
    'menuItems': reducedMenuItems
  });
};

exports.search = function(req, res) {
    var text = req.params.searchtext;
    console.log(text);
    var searchTokens = text.split(/\s+/);
    var retHalls = [];

    // Search menus for matching hall/menu combos
    var menus = data.menuItems;
    var halls = data.halls;
    for(var i = 0; i < menus.length; i++) {
        var hallMenu = menus[i];
        var hall = halls[hallMenu.hall_index];
        var menuMatches = [];

        for(var j = 0; j < hallMenu.menu.length; j++) {
            var menuItem = hallMenu.menu[j];
            var nameTokens = menuItem.name.split(/\s+/);
            var nameMatches = arrMatches(searchTokens, nameTokens);
            if(nameMatches > 0) {
                menuItem["relevance"] = nameMatches;
                menuMatches.push(menuItem);
            }
        }

        if(menuMatches.length > 0) {
            hall["menuMatches"] = menuMatches;
            retHalls.push(hall);
        }
    }

    res.json({
        "halls": retHalls
    });
};


function arrMatches(arr1, arr2) {
    var matches = 0;
    for(var i = 0; i < arr1.length; i++) {
        matches += matchesInArr(arr2, arr1[i]);
    }
    return matches;
}

function matchesInArr(arr, str) {
    str = str.toLowerCase();
    var matches = 0;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].toLowerCase() == str) {
            matches++;
        }
    }
    return matches;
}
