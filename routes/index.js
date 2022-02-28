	var express = require('express');
	var router = express.Router();

	const { signup,login,updateUser} = require('../controllers/userController');
	const { createProduct,update_product } = require('../controllers/productController');
	const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
	const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
	
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
	router.put('/user/:id',verifyTokenAndAuthoriation, async(req,res) => {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.ACCESS_SECRET).toString();
		}
		try {
			const updateUser = await User.findByIdAndUpdate(req.params.id, {
					$set: req.body
				},
				{new:true}
			);
			res.status(200).json({
				status: true,
				message: "Đã cập nhật thông tin thành công!",
				data: {
					updateUser
				}
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				status: false,
				message:"Cập nhật thông tin không thành công!",
			});
		}
	});

	// Productions
	router.post("/createProduct",createProduct);
	router.post("/updateProd/:id",update_product);



	
module.exports = router;
