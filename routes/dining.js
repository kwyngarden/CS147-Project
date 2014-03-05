
/*
 * GET dining hall page.
 */

var data = require('../data.json');
var models = require('../models');
var date = require('./date');

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/dining/' + encodeURIComponent(req.params.name);
  var hallName = req.params.name;
  var menu;
  var weekdayHours;
  var weekendHours;

  models.Hall
        .findOne({'name': hallName})
        .populate('menu')
        .exec(function(err, hall) {
          var menu = date.getMenu(hall.menu);
          var hours = hall.hours;
          var weekdayHours = getSortedHoursArr(hours.weekdays);
          var weekendHours = getSortedHoursArr(hours.weekends);
          var closestMeal = getClosestMealAndHours(hours.weekdays, hours.weekends);
          //console.log(closestMeal);

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

function getSortedHoursArr(hoursObj) {
  hoursArrArr = []
  for (var meal in hoursObj) {
    if (hoursObj.hasOwnProperty(meal)) {
      hoursArrArr.push([meal, hoursObj[meal][0], hoursObj[meal][1]]);
    }
  }
  return sortHoursArrArr(hoursArrArr);
}

function sortHoursArrArr(hoursArrArr) {
  return hoursArrArr.sort(function(a, b){
    var timeA = parseInt(a[1].split(':')[0]);
    var timeB = parseInt(b[1].split(':')[0]);
    if(endsWith(a[1], 'pm'))
      timeA += 12;
    if(endsWith(b[1], 'pm'))
      timeB += 12;
    return timeA-timeB;
  });
}

function getClosestMealAndHours(weekdayHours, weekendHours) {
  var now = new Date();
  now.setHours(now.getHours() - 8);

  var hoursObj = now.getDay() != 0 && now.getDay() != 6 ? weekdayHours : weekendHours;
  
  var hoursArrArr = []
  for (var key in hoursObj) {
    if (hoursObj.hasOwnProperty(key)) {
      hoursArrArr.push([key, hoursObj[key][0], hoursObj[key][1]]);
    }
  }
  hoursArrArr = sortHoursArrArr(hoursArrArr);

  // Return any meal in progress
  for (var i = 0; i < hoursArrArr.length; i++) {
    if (timeInRange(now, hoursArrArr[i])) {
      return hoursArrArr[i];
    }
  }
  // Return first meal with start time after hours
  for (var i = 0; i < hoursArrArr.length; i++) {
    var componentsOpen = getHoursComponents(hoursArrArr[i][1]);
    if (timeAfter(componentsOpen['hour'], componentsOpen['mins'], now.getHours(), now.getMinutes())) {
      return hoursArrArr[i];
    }
  }
  // Return last meal of day
  return hoursArrArr[hoursArrArr.length-1];
}

function timeInRange(now, hoursArr) {
  // console.log("Checking if " + now + " is within " + hoursArr);
  var componentsOpen = getHoursComponents(hoursArr[1]);
  var componentsClose = getHoursComponents(hoursArr[2]);
  return timeAfter(now.getHours(), now.getMinutes(), componentsOpen['hour'], componentsOpen['mins']) &&
    timeAfter(componentsClose['hour'], componentsClose['mins'], now.getHours(), now.getMinutes());
}

function timeAfter(hoursLate, minutesLate, hoursEarly, minutesEarly) {
  // console.log('comparing:' + hoursLate + ':' + minutesLate + ' to ' + hoursEarly + ':' + minutesEarly);
  return (hoursLate > hoursEarly) || ((hoursLate == hoursEarly) && (minutesLate >= minutesEarly));
}

function getHoursComponents(hoursString) {
  var components = hoursString.split(':');
  var hour = parseInt(components[0]);
  var mins = parseInt(components[1].slice(0,2));
  if (endsWith(hoursString, 'pm')) {
    hour += 12;
  }
  return { 'hour': hour, 'mins': mins };
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
