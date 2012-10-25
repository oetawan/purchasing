module.exports = function(app, passport){
	
	var path = require('path'),
        category = require(path.join(__dirname, 'models/Category'))();

	app.get('/categories', function(req, res){
		if(req.isAuthenticated()) {
            category.findAll(req.user.login, function(err, cats){
                res.json(cats);    
            });
		} else {
			res.redirect('/login');
		}
	});

    app.post('/categories', function(req, res){
        category.save({
            code: req.body.code,
            name: req.body.name
        }, function(err, category){
            if(err)
                res.send(err.message, 500);
            else
                res.json(category);
        });
    });
};