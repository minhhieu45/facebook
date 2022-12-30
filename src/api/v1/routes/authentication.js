const express  = require('express')
const router   = express.Router();
const passport = require('passport')

module.exports = (function() {   

    router.get('/', async function(req, res){
		let user = await req.user;
		console.log(user);
		if(user){
			return res.render('index', { user: user._json });
		}
		return res.render('login');
	  
	});
    router.get('/login', function(req, res){
	  //Return to page login
	  res.render('login');
	});

	router.get('/auth/facebook', passport.authenticate('facebook',{scope: ['email','public_profile']}));

	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });

	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

    return router;    
})();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}