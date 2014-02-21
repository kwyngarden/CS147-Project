exports.view = function(req, res){
	res.render('about', {
        'username': req.session.username
    });
}