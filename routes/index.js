	var express = require('express');
	var router = express.Router();

	const User = require('../controllers/userController');
	const { createProduct,update_product,get_product} = require('../controllers/productController');
	const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
	const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
	const upfile = require('../common/upfile');
	
	// VIEW DASHBOARD
	router.get('/dashboard', function(req, res, next) {
		res.render('pages/dashboard');
	});

	// VIEW TABLE
	router.get('/tables', async function(req, res, next) {
		let listPro = await get_product(req,res);
		console.log(listPro.data);
		res.render('pages/tables',{list: listPro.data,NAME:"chauruon"});
	});

	// VIEW billing
	router.get('/billing', function(req, res, next) {
		res.render('pages/billing');
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
	var middleAddProduct = upfile.single('img');
	router.post("/createProd",middleAddProduct, async (req,res)=>{
		let { body } = req
		if (req.file) {
			let imgURL = req.file.image
			body = { ...body, image: imgURL }
		
		 	await createProduct(body)
			res.redirect('tables')
		}
	  
	});
	router.post("/updateProd/:id",update_product);




	// router.get('/', checkLogin.check, async function (req, res, next) {
	// 	let list = await productController.getListProducts()
	// 	res.render('product', { list });
	//   });
	router.get("api/getProd",get_product);



	
module.exports = router;
