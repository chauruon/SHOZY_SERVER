	var express = require('express');
	var router = express.Router();

	const User = require('../controllers/userController');
	const { createProduct,update_product,get_product} = require('../controllers/productController');
	const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
	const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
	
	// VIEW DASHBOARD
	router.get('/dashboard', function(req, res, next) {
		res.render('pages/dashboard');
	});

	// VIEW TABLE
	router.get('/tables', function(req, res, next) {
		res.render('pages/tables');
	});

	// VIEW billing
	router.get('/billing', function(req, res, next) {
		res.render('pages/billing');
	});

	// VIEW virtual-reality
	router.get('/virtual-reality', function(req, res, next) {
		res.render('pages/virtual-reality');
	});

	// VIEW RTL
	router.get('/rtl', function(req, res, next) {
		res.render('pages/rtl');
	});

	// VIEW profile
	router.get('/profile', function(req, res, next) {
		res.render('pages/profile');
	});

	

	

	// LOGIN
	router.get('/', function(req, res, next) {
		res.render('pages/sign-in');
	});
	router.post('/login',async (req, res) => {
		if (req.body) {
			let user = {
				numPhone: req.body.numPhone,
				password: req.body.password,
			}
			await User.login(user);
			return res.redirect('dashboard');
		}
	});

	// REGISTER
	router.get('/register', function(req, res, next) {
		res.render('pages/sign-up');
	});
	router.post('/register/user',User.signup);


	
	
	
	
	// cập nhật user vẫn chưa được
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
	router.post("/createProd", async (req,res)=>{
		if (req.body) {
			let infoProd = {
				name: req.body.name,
				image: req.body.image,
				price: req.body.price,
				quantity: req.body.quantity,
				discount: req.body.discount,
				description: req.body.description,
				sizes: req.body.sizes,
			}
			await createProduct(infoProd);
			return res.redirect('tables');
		}
	});
	router.post("/updateProd/:id",update_product);
	router.get("/getProd",get_product);



	
module.exports = router;
