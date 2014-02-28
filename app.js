
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var partials = require('express-partials');
var mongoose = require('mongoose');
var dburl = process.env.MONGOLAB_URI || 'mongodb://localhost/myDatabase';
var db = mongoose.connect(dburl);

var index = require('./routes/index');
var events = require('./routes/events');
var map = require('./routes/map');
var favorites = require('./routes/favorites');
var food = require('./routes/food');
var dining = require('./routes/dining');
var about = require('./routes/about');
var login = require('./routes/login');
var model = require('./models');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/alt', index.viewAlt);
app.get('/events', events.view);
app.get('/map', map.view);
app.get('/food/:dhall/:name', food.view);
app.get('/favorites', favorites.view);
app.get('/dining/:name', dining.view);
app.get('/search/:searchtext', index.search);
app.get('/about', about.view);
app.get('/search', index.view); // If no parameters sent, reroute to homepage
app.get('/login', login.view);
app.post('/user_login', login.login);
app.get('/user_logout', login.logout);
app.post('/food/upvote/:dhall/:name/:number', food.upvote);
app.post('/food/downvote/:dhall/:name/:number', food.downvote);
app.post('/addFavorite', favorites.addFavorite);
app.post('/removeFavorite', favorites.removeFavorite);
app.post('/getNearby', index.getNearby);

//app.get('/project/:name', project.viewProject)
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
