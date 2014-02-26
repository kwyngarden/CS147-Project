
/*
 * GET dining hall page.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/dining/'+encodeURIComponent(req.params.name);
  var hallName = req.params.name;
  var menu;
  var weekdayHours;
  var weekendHours;

  models.Hall
        .findOne({'name': hallName})
        .populate('menu')
        .exec(function(err, hall) {
          var menu = hall.menu;
          var hours = hall.hours;
          var weekdayHours = hours.weekdays;
          var weekendHours = hours.weekends;

          // Render the dining hall page
          res.render('dining', {
            'lastPage': lastPage,
            'username': req.session.username,
            'hallName': hallName,
            'menu': menu,
            'weekdayHours':weekdayHours,
            'weekendHours': weekendHours
          });
        });
};