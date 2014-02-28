
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var dburl = process.env.MONGOLAB_URI || 'mongodb://localhost/myDatabase';
var db = mongoose.connect(dburl);

// Do the initialization here

// Step 1: load the JSON data
var data = require('./data.json');

// Step 2: Remove all existing documents
models.Hall
  .find()
  .remove()
  .exec(removeMenuItems); // callback to continue at

function removeMenuItems(err) {
  models.MenuItem
    .find()
    .remove()
    .exec(removeUsers);
}

function removeUsers(err) {
  models.User
    .find()
    .remove()
    .exec(createHall);
}

// Step 3: load the data from the JSON file
var i = 0;
function createHall(err) {
  if(err) console.log(err);

  if (i >= data.halls.length) {
    mongoose.connection.close();
    console.log("Done!");
    return;
  }

  var hall = data.halls[i];
  var menu = hall.menu;

  // Load and create the menu items for the given hall
  var menuItems = [];
  var itemsLeft = menu.length;

  for (var j=0; j<menu.length; j++) {
    // Create new menu item
    var newMenuItem = new models.MenuItem({
      'name': menu[j].name,
      'imageURL': menu[j].imageURL,
      'upvotes': menu[j].upvotes,
      'downvotes': menu[j].downvotes,
      'dining_hall': menu[j].dining_hall,
      'nutritional_info': menu[j].nutritional_info,
      'favorites': menu[j].favorites,
      'upvoters': [],
      'downvoters': [],
      'tags': menu[j].tags
    });

    // Save new menu item
    newMenuItem.save(function(err, newMenuItem) {
      if(err) console.log(err);
      else {
        itemsLeft--;
        menuItems.push(newMenuItem._id);

        // Create a new dining hall instance with the menu items
        if (itemsLeft <= 0) {
          if (i < data.halls.length) {
            i += 1;
            // Create dining hall
            var newHall = new models.Hall({
              'name': hall.name,
              'latitude': hall.latitude,
              'longitude': hall.longitude,
              'hours': hall.hours,
              'imageURL': hall.imageURL,
              'menu': menuItems
            });

            // Save dining hall
            newHall.save(function(err, newHall) {
              console.log(i, hall.name);
              if(err) console.log(err);
              models.Hall.find({'name': newHall.name})
                         .populate('menu')
                         .exec(function(){});
              createHall();
            });
          }
        }
      }
    });
  }
}