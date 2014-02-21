
/*
 * GET home page.
 */

var data = require('../data.json');

// HOW-TO: write JSON to file
var fs = require('fs');
// To make a permanent change:
// 1. Make sure using current data: data = require('../data.json')
// 2. Modify data JSON object (data.halls[0].property = newvalue, etc)
// 3. fs.writeFile('../data.json', JSON.stringify(data));


exports.view = function(req, res){
    var halls = JSON.parse(JSON.stringify(data.halls));
    for(var i = 0; i < halls.length; i++) {
        var menu = halls[i].menu;
        halls[i].menu = menu;
    }
    res.render('index', {
        'halls': halls,
        'username': req.session.username,
        'isSearch': false
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
            for(var tagIndex = 0; tagIndex < menuItem.tags.length; tagIndex++) {
                nameTokens.push(menuItem.tags[tagIndex]);
            }
            var nameMatches = arrMatches(searchTokens, nameTokens);
            if(nameMatches > 0) {
                menuItem["relevance"] = nameMatches;
                menuMatches.push(menuItem);
            }
        }

        if (menuMatches.length > 0) {
            sortMatches(menuMatches, 'relevance', false);
            hall.menu = menuMatches;
            retHalls.push(hall);
        }
    }

    res.render('index', {
        'halls': retHalls,
        'isSearch': true,
        'query': text
    });
};

// Standard JSON sorting algorithm.
function sortMatches(menuMatches, prop, asc) {
    menuMatches.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
}


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
