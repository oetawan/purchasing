/**
 * Module dependencies.
 */

var http = require('http'),
  	express = require('express'),
  	flash = require('connect-flash'),
  	path = require('path'),
  	authStore = require(path.join(__dirname, 'apps/authentication/authStore')),
  	passportAuth = require(path.join(__dirname, 'apps/authentication/passportAuth'));

var app = express();
var store = authStore();
var passport = passportAuth(store);

app.configure(function(){	
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
  	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret : "qpwoeirutyalskdjfhgzmxncbv"
  	}));
  	app.use(flash());
  	app.use(passport.initialize());
  	app.use(passport.session());
  	app.use(app.router);
  	app.set('views', path.join(__dirname + 'views'));
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
require('./apps/authentication/routes')(app, passport, store);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});