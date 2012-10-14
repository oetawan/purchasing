var path = require('path');

module.exports = function (app, passport, authStore) {
	
	app.get('/login', function(req, res){
		var errors = req.flash().error || [];
		if(errors.length) {
			res.render(path.join(__dirname, 'views/login.jade'), {errors: errors});
		}
		else {
			res.render(path.join(__dirname, 'views/login.jade'));
		}
	});

	app.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/register', function(req, res){
		res.render(path.join(__dirname, 'views/register.jade'));
	});

	app.post('/register', function(req, res){
		var user;
		try {
			user = {
				username  : req.body.username,
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