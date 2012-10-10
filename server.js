/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , engines = require('consolidate')
  , everyauth = require('everyauth');

require('./apps/authentication/configureEveryauth')(everyauth);

var app = express();

app.configure(function(){	
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.engine('ejs', engines.ejs);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret : "qpwoeirutyalskdjfhgzmxncbv"
  	}));
  	app.use(everyauth.middleware());
  	app.use(app.router);
  	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpException : true,
		showStack : true
	}));
});

app.configure('test', function() {
	app.set('port', 3001)
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

require('./apps/home/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});