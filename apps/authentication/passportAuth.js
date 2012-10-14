module.exports = function (authStore) {
	var store = authStore,
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy({
    	usernameField: 'username',
    	passwordField: 'password'
  	},
  	function(username, password, done){
		store.findUser(username, function(err, user){
			if(err) {
				return done(err);
			}
			if(!user){
				return done(null, false, {message: 'Unknown user'});
			}
			if(!user.validPassword(password)){
				return done(null, false, {message: 'Invalid password'});
			}
			return done(null, user);
		});
	}));

	passport.serializeUser(function(user, done){
		done(null, user.username);
	});

	passport.deserializeUser(function(id, done){
		store.findUser(id, function(err, user){
			done(err, user);
		});
	});

	return passport;
}