exports.view = function(req, res){
    var lastPage = req.session.lastPage;
    req.session.lastPage = '/about';
	res.render('about', {
        'lastPage': lastPage,
        'username': req.session.username
    });
}