
var request = require('request');

/*
 * GET dining hall page.
 */

 // function getEvents(){
 // 	var events = [] 
	// var html = $.get("www.freefoodstanford.com", function(response) { alert(response) });
	// print html

	// return events
 // }





exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/events';
  // var events = getEvents();
  res.render('events', {
    'lastPage': lastPage,
    'username': req.session.username,
  });
};

exports.freefood = function(req, res){

	var url = 'http://www.freefoodstanford.com';
	request(url).pipe(res);

}

