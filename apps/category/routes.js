module.exports = function(app, passport){
	
	var path = require('path'),
        category = require(path.join(__dirname, 'models/Category'))();

	app.get('/categories', function(req, res, next){
		if(req.isAuthenticated()) {
            category.findAll(req.user.login, function(err, cats){
                res.json(cats);    
            });
		} else {
			res.redirect('/login')
		}
	});
};