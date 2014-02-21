
/*
 * GET dining hall page.
 */

exports.view = function(req, res){
  var name = req.params.name;
  res.render('events', {
    'username': req.session.username
  });
};
