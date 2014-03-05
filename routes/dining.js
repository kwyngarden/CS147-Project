
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
          var closestMeal = getClosestMealAndHours(weekdayHours, weekendHours);
          console.log(closestMeal);

          // Render the dining hall page
          res.render('dining', {
            'lastPage': lastPage,
            'username': req.session.username,
            'hallName': hallName,
            'menu': menu,
            'weekdayHours':weekdayHours,
            'weekendHours': weekendHours,
            'closestMeal': closestMeal[0],
            'closestMealOpen': closestMeal[1],
            'closestMealClose': closestMeal[2]
          });
        });
};

function getClosestMealAndHours(weekdayHours, weekendHours) {
  var now = new Date();
  var hoursObj = now.getDay() != 0 && now.getDay() != 6 ? weekdayHours : weekendHours;
  
  var hoursArrArr = []
  for (var key in hoursObj) {
    if (hoursObj.hasOwnProperty(key)) {
      hoursArrArr.push([key, hoursObj[key][0], hoursObj[key][1]]);
    }
  }
  hoursArrArr.sort(function(a, b){
    return a[1]-b[1];
  });

  for (var i = 0; i < hoursArrArr.length; i++) {
    if (timeInRange(now, hoursArrArr[i])) {
      return hoursArrArr[i];
    }
  }
  return hoursArrArr[hoursArrArr.length-1];
}

function timeInRange(now, hoursArr) {
  var componentsOpen = getHoursComponents(hoursArr[1]);
  var componentsClose = getHoursComponents(hoursArr[2]);
  return timeAfter(now.getHours(), now.getMinutes(), componentsOpen['hour'], componentsOpen['mins']) &&
    timeAfter(componentsClose['hour'], componentsClose['mins'], now.getHours(), now.getMinutes());
}

function timeAfter(hoursLate, minutesLate, hoursEarly, minutesEarly) {
  console.log('comparing:' + hoursLate + ':' + minutesLate + ' to ' + hoursEarly + ':' + minutesEarly);
  return (hoursLate > hoursEarly) || ((hoursLate == hoursEarly) && (minutesLate >= minutesEarly));
}

function getHoursComponents(hoursString) {
  var components = hoursString.split(':');
  var hour = parseInt(components[0]);
  var mins = parseInt(components.slice(0,2));
  if (endsWith(hoursString, 'pm')) {
    hour += 12;
  }
  return { 'hour': hour, 'mins': mins };
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}




