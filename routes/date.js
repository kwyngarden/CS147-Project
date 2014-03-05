exports.getMenu = function getMealAdjustedMenu(menu) {
  var currMealID = getMenuIdentifier();
  var newMenu = [];
  for (var i = 0; i < menu.length; i++) {
    var mealIDlist = menu[i].mealList;
    if (mealIDlist.indexOf(currMealID) >= 0) {
      newMenu.push(menu[i]);
    }
  }
  console.log(newMenu);
  return newMenu;
};

function getMenuIdentifier() {
  var now = new Date();
  now.setHours(now.getHours() - 8);
  var meal = 'l';
  if(now.getHours() >= 15) {
    meal = 'l';
  }
  var day = now.getDay() - 2;
  if(day < 0 || day > 3) {
    day = 3;
  }
  return day + meal ;
}