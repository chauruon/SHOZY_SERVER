	var express = require('express');
	var router = express.Router();

	const {signup} = require('../controllers/userController');
	const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');

	
	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('auth/login');
	});

	// User
	router.get('/register', function(req, res, next) {
		res.render('auth/register');
	});
	router.post('/register/user',signup);
module.exports = router;
