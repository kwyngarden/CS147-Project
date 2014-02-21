exports.view = function(req, res){
    req.session.lastPage = '/about';
	res.render('about', {
        'username': req.session.username
    });
}