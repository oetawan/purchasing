var  path = require('path');

var routes = function(app){
	app.get('/', function(req, res){
		res.sendfile(path.join(__dirname, 'views/index.html'));
	});
}

module.exports = routes;