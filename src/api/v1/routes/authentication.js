const express  = require('express')
const router   = express.Router();
const passport = require('passport')

module.exports = (function() {   
	router.get('/', (req,res)=>{
		return res.render('index');
	});
    router.get('/home', async function(req, res){
		let user = await req.user;
		console.log(user);
		if(user){
			return res.render('home', { user: user._json });
		}
		return res.render('/');
	});   
	router.get('/auth/facebook', passport.authenticate('facebook',{scope: ['email','public_profile']}));

	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/index' }),
	  function(req, res) {
	    res.redirect('/home');
	  });

	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

    return router;    
})();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/index')
}