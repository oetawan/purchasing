var path = require('path');

var mongo = require('mongoskin');
var db = mongo.db('mongodb://zain:fakhri18022010@ds039037.mongolab.com:39037/zain_purchasing',{save: true});
//db.collection('user').save({id:'oetawan@gmail.com', email:'oetawan@gmail.com', password:'123'});
var configureEveryauth = function(everyauth){

everyauth.everymodule
  .findUserById( function (id, callback) {
    db.collection('user').findOne(function(err, user){
      callback(null, {id: user.id, email: user.email});
    });
  });

everyauth
  .password
    .loginWith('email')
    .getLoginPath('/login')
    .postLoginPath('/login')
    .loginView(path.join(__dirname, 'views/login.jade'))
    .loginLocals(function(req, res){
      return { 
        title: 'Login to Zain Purchasig'
      }
    })
    .authenticate( function (email, password, req) {
      var promise;
      var errors = [];
      
      if (!email) errors.push('Missing login');
      if (!password) errors.push('Missing password');
      if (errors.length) return errors;
      
      promise = this.Promise();
      
      db.collection('user').findOne({email:email}, function(err, user){
        
        if(err) {
          errors.push(err.message || err);
          return promise.fulfill(errors);
        }
        
        if(!user) {
          errors.push('Missing user');
          return promise.fulfill(errors);
        }
        
        if (!(user.email === email)) {
          errors.push('Login failed');
          return promise.fulfill(errors);
        }

        if (user.password !== password) {
          errors.push('Login failed');
          return promise.fulfill(errors);
        }

        promise.fulfill(user);

      });
      
      return promise; 
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