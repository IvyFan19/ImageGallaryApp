var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

router.get('/', function(req, res, next) {
  res.sendFile('gallery.html', {root:'public/'});
});

// http://localhost:3000/login
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root:'public/'});
});

router.get('/register', function(req, res, next) {
  res.sendFile('registration.html', {root:'public/'});
});

 
// If true, will into next function
// If false, redirect to login
router.use('/postimage', isLoggedIn);
router.get('/postimage', function(req, res, next) {
  res.sendFile('postimage.html', {root:'public/'});
});



//module.exports is the object that's actually returned as the result of a require call.
module.exports = router;
