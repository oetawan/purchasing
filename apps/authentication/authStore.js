module.exports = function(){
	var bcrypt = require('bcrypt'),
		mongoose = require('mongoose'),
		db = mongoose.createConnection('mongodb://oetawan:fakhri18022010@ds031587.mongolab.com:31587/zain_account');
	
	var UserSchema = new mongoose.Schema({
		login: String,
		password: String,
		phone: String,
		firstName: String,
		lastName: String
	});

	UserSchema.methods.validPassword = function(pwd) {
		return bcrypt.compareSync(pwd, this.password);
	};
	
	var User = db.model('User', UserSchema),
	
	findUser = function(username, callback){
		User.findOne({login: username}, {login:1, password:1, phone:1, firstName:1, lastName:1}, { safe: true }, function(err, user){
			callback(err, user);
		});
	},

	saveUser = function (user, callback) {
		encryptPassword(user);
		var newUser = new User(user);
		newUser.save(function(err){
			callback(err);
		});
	},

	encryptPassword = function(user){
		var salt = bcrypt.genSaltSync(10);
		var encryptedPassword = bcrypt.hashSync(user.password, salt);
		user.password = encryptedPassword;		
	};

	return {
		findUser: findUser,
		saveUser: saveUser
	};
}