
/*
 * GET dining hall page.
 */

exports.view = function(req, res){
  var lastPage = req.session.lastPage;
  req.session.lastPage = '/events';
  var name = req.params.name;
  res.render('events', {
    'lastPage': lastPage,
    'username': req.session.username
  });
};
