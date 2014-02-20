
/*
 * GET home page.
 */

var data = require('../data.json');

exports.view = function(req, res){
    var halls = JSON.parse(JSON.stringify(data.halls));
    for(var i = 0; i < halls.length; i++) {
        var menu = halls[i].menu.slice(0,2);
        halls[i].menu = menu;
    }

  // var reducedMenuItems = JSON.parse(JSON.stringify(data['menuItems']));
  // for (var i=0; i<reducedMenuItems.length; i++) {
  // 	reducedMenuItems[i]['menu'] = reducedMenuItems[i]['menu'].slice(0, 2)
  // }
    res.render('index', {
        'halls': halls
    });
};

exports.search = function(req, res) {
    var text = req.params.searchtext;
    var searchTokens = text.split(/\s+/);
    var retHalls = [];

    // Search menus for matching hall/menu combos
    var halls = JSON.parse(JSON.stringify(data.halls));
    for(var i = 0; i < halls.length; i++) {
        var hall = halls[i];
        var hallMenu = hall.menu;
        var menuMatches = [];

        for(var j = 0; j < hallMenu.length; j++) {
            var menuItem = hallMenu[j];
            var nameTokens = menuItem.name.split(/\s+/);
            var nameMatches = arrMatches(searchTokens, nameTokens);
            if(nameMatches > 0) {
                menuItem["relevance"] = nameMatches;
                menuMatches.push(menuItem);
            }
        }

        if (menuMatches.length > 0) {
            hall.menu = menuMatches;
            retHalls.push(hall);
        }
    }

    res.render('index', {
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
