var path = require('path');

var mongo = require('mongoskin');
var db = mongo.db('mongodb://zain:fakhri18022010@ds039037.mongolab.com:39037/zain_purchasing',{save: true});
//db.collection('user').save({id:'oetawan@gmail.com', email:'oetawan@gmail.com', password:'123'});

var configureEveryauth = function(everyauth){

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, db.collection('user').findOne({'id': id}));
  });

everyauth
  .password
    .loginWith('email')
    .getLoginPath('/login')
    .postLoginPath('/login')
    .loginView(path.join(__dirname, 'views/login.ejs'))
    .loginLocals({
      title: 'Login' 
    })
    .authenticate( function (email, password) {
      var errors = [];
      if (!email) errors.push('Missing login');
      if (!password) errors.push('Missing password');
      if (errors.length) return errors;
      var user;
      db.collection('user').findOne({id: email}, function(err, result){
          user = result;
      });
      if(!user) {
        console.log("user not found");
        errors.push('Missing user');
        return errors;
      }
      console.log("found user => " + user);
      if (!(user.email === email)) return ['Login failed'];
      if (user.password !== password) return ['Login failed'];
      return user; 
    })
    .getRegisterPath('/register')
    .postRegisterPath('/register')
    .registerView(path.join(__dirname,'views/register.ejs'))
    .validateRegistration( function (newUserAttrs, errors) {
      var login = newUserAttrs.login;
      if (usersByLogin[login]) errors.push('Login already taken');
      return errors;
    })
    .registerUser( function (newUserAttrs) {
      var login = newUserAttrs[this.loginKey()];
      return usersByLogin[login] = addUser(newUserAttrs);
    })

    .loginSuccessRedirect('/')
    .registerSuccessRedirect('/');
};

module.exports = configureEveryauth;