	var express = require('express');
	var router = express.Router();

	const User = require('../controllers/userController');
	const productController = require('../controllers/productController');
	const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
	const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
	const upfile = require('../common/upfile');
	const Prod = require('../models/productModels');
	
	// VIEW DASHBOARD
	router.get('/dashboard', function(req, res, next) {
		res.render('pages/dashboard');
	});

	// VIEW TABLE
	router.get('/tables',async function(req, res, next) {
		let list = await productController.getListProducts();
		res.render('pages/tables',{list});

		  
		// Prod
		// .find() // find tất cả các data
		// .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
		// .limit(perPage)
		// .exec((err, list) => {
		// 	console.log(list);
		// 	Prod.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
		// 		if (err) return next(err);
		// 		// res.send(products) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
		// 		res.render('pages/tables', {
		// 			list, // sản phẩm trên một page
		// 			current: page, // page hiện tại
		// 			pages: Math.ceil(count / perPage) // tổng số các page
		// 		});
		// 	});
		// });
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
			await User.login(req,res,user);
			// return res.redirect('/dashboard');			
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
	router.post("/createProd",upfile.single('image'), async (req,res)=>{
		let { body } = req
		if (req.file) {
			let imgURL = req.file.image
			body = { ...body, image: imgURL}
		console.log(body);
			await productController.createProduct(body)
			res.redirect('tables')
		}
	  
	});
	router.get("/getPro",productController.get_product);
	router.post("/updateProd/:id",productController.update_product);
	router.post("/creProd", async (req,res)=>{
		let { body } = req
		return await productController.createProduct(body)
	});
	router.post("/DeletePro",async (req,res,next)=>{
		const {id} = req.body;
		 await productController.delete()
	});

	// Shopping cart
	router.post("/toCart",async (req,res)=>{
		if (req.body) {			
			let id = req.body.id;
			console.log("id pro to cart: " + JSON.stringify(req.body));
			console.log("id to cart: " + JSON.stringify(id));
			 await productController.toCart(id)
		}
	});
	router.get("/getToCart",productController.getToCart);
	router.post("/DeleteToCart",async (req,res,next)=>{
		const {id} = req.body;
		 await productController.deleteCart()
	});
	
module.exports = router;
