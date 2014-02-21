
/*
 * GET dining hall page.
 */

exports.view = function(req, res){
  req.session.lastPage = '/events';
  var name = req.params.name;
  res.render('events', {
    'username': req.session.username
  });
};
