var path = require('path');

var routes = function(app){
	app.get('/login', function(req, res){
		res.render(path.join(__dirname, 'views/login.ejs'));
	});
};

module.exports = routes;