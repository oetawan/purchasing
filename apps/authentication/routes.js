var path = require('path');

module.exports = function (app, passport, authStore) {

	app.get('/user/available/:username', function(req, res){
		var username = req.params.username;
		authStore.findUser(username, function(err, user){
			if(err){
				res.json({available: false, error: err});
			} else {
				if(user){
					res.json({available: false});
				} else {
					res.json({available: true});
				}
			}
		});
	});

	app.get('/user', function(req, res){
		res.json({username: req.user.login});
	});
	
	app.get('/login', function(req, res){
		var errors = req.flash().error || [];
		if(errors.length) {
			res.render(path.join(__dirname, 'views/login.jade'), {errors: errors});
		}
		else {
			res.render(path.join(__dirname, 'views/login.jade'));
		}
	});

	var flashError = function(info, req){
		for(var i in info){
	  		if(info.hasOwnProperty(i)){
	  			if(i === 'message'){
	  				console.log(info[i]);
	  				req.flash('error', [info[i]]);
	  			}
	  		}
	  	}
	}

	/*app.post('/login', passport.authenticate('local',{
		successRedirect: '/', 
		failureRedirect: '/login',
		failureFlash: true
	}));*/

	app.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			flashError(info, req);
			if (err) { return next(err) }
		  	if (!user) { return res.redirect('/login') }
		  	req.logIn(user, function(err) {
		    	if (err) { return next(err); }
		    	
		    	console.log('body:');
		    	console.log(req.body);
		    	
		    	if(req.body.remember === 'true') {
		    		req.session.cookie.maxAge = 7 * 24 * 60 * 60000;
		    	}

		    	return res.redirect('/');
		  	});
		})(req, res, next);
	});

	app.get('/app/register.js', function(req, res){
		res.sendfile(path.join(__dirname, 'views/register.js'));
	});

	app.get('/app/login.js', function(req, res){
		res.sendfile(path.join(__dirname, 'views/login.js'));
	});

	app.get('/register', function(req, res){
		res.render(path.join(__dirname, 'views/register.jade'));
	});

	app.post('/register', function(req, res){
		var user;
		try {
			user = {
				login     : req.body.username,
				password  : req.body.password,
				phone     : req.body.phone,
				firstName : req.body.firstName,
				lastName  : req.body.lastName
			};
			authStore.saveUser(user, function(err){
				if(err){
					throw err;
				} else {
					req.logIn(user,function(err){
						if(err)
							throw err;
						res.redirect('/');	
					});
				}
			});
		} catch (err) {
			res.render(path.join(__dirname, 'views/register.jade'), {errors: [err], data: user});	
		}
	});

	app.get('/logout', function(req, res){
		req.logOut();
  		res.redirect('/');
	});
};