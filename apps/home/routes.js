var  path = require('path');

var routes = function(app, passport){
	app.get('/', function(req, res, next){
		if(req.isAuthenticated()) {
			res.sendfile(path.join(__dirname, 'views/index.html'));
		} else {
			res.redirect('/login')
		}
	});
}

module.exports = routes;