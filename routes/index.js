	var express = require('express');
	var router = express.Router();

	const { signup,login,updateUser} = require('../controllers/userController');
	const { createProduct,update_product } = require('../controllers/productController');
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
	router.post('/login',login);
	router.put('/user/:id',updateUser);

	// Productions
	router.post("/createProduct",createProduct);
	router.post("/updateProd/:id",update_product);



	
module.exports = router;
