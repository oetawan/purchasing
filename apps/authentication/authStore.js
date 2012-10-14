module.exports = function(){
	var mongoose = require('mongoose'),
		db = mongoose.createConnection('mongodb://zain:fakhri18022010@ds039037.mongolab.com:39037/zain_purchasing');
	
	var UserSchema = new mongoose.Schema({
		username: String,
		password: String,
		phone: String,
		firstName: String,
		lastName: String
	});

	UserSchema.methods.validPassword = function(pwd) {
		return this.password === pwd;
	};
	
	var User = db.model('User', UserSchema),
	
	findUser = function(username, callback){
		User.findOne({username: username}, {username:1, password:1, phone:1, firstName:1, lastName:1}, { safe: true }, function(err, user){
			callback(err, user);
		});
	},

	saveUser = function (user, callback) {
		var newUser = new User(user);
		newUser.save(function(err){
			callback(err);
		});
	}

	return {
		findUser: findUser,
		saveUser: saveUser
	};
}