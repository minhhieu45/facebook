const express = require('express');
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../src/config/config');
const routes = require('../src/api/v1/routes/authentication');
const app = express();
const logEvents = require('../src/api/v1/helpers/logEvents');
const path = require('path');
require('dotenv').config();
// Passport session setup. 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Sử dụng FacebookStrategy cùng Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_key,
    clientSecret:config.facebook_secret ,
    callbackURL: config.callback_url,
    enableProof: true,
    profileFields: ['id', 'displayName', 'email', 'birthday','about','education','gender','hometown','languages','location','accounts']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use('/assets', express.static("src/api/v1/interfaces/assets"));
app.set('views', __dirname + '/api/v1/interfaces');
app.set('view engine', 'ejs'); // sử dụng view ejs
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body để get data
app.use(session({
  secret: 'qưertyuiopasdfghjklzxcvbnmZAQWSXECDFEKLJKJTKLD', 
  key: 'sessionID', 
  resave: true,
  cookie:{maxAge: 15*60*60*1000}
}));  //Save user login
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use((err, req, res, next)=>{
  logEvents(`${req.url} --- ${req.method} --- ${err.message}`);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message : err.message
  });
});

app.listen(3000);



