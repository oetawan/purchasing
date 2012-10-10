var  path = require('path');

var routes = function(app){
	app.get('/', function(req, res){
		if(req.loggedIn) {
			console.log(req.user);
			res.sendfile(path.join(__dirname, 'views/index.html'));
		} else {
			res.redirect('/login')
		}
	});
}

module.exports = routes;