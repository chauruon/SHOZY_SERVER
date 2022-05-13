	var express = require('express');
	var router = express.Router();
	const mongoose = require("mongoose");

	const User = require('../controllers/userController');
	const productController = require('../controllers/productController');
	const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
	const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
	const upfile = require('../common/upfile');
	const Prod = require('../models/productModels');
	const carts = require('../models/cartModels');
	const purchase_order = require('../models/purchaseOrderModels');
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
	/**
	 * @param {id}
	 * chi tiết sản phẩm
	*/
	router.get(`/:id`, async (req, res) => {
		console.log("hello");
	
		if (!mongoose.isValidObjectId(req.params.id)) {
		return res.status(400).send("Invalid Prouct Id");
		}
	
		const product = await Prod.findById(req.params.id).populate(
			"id_Category"
		);
		// const product = await Product.findOne({_id:req.params.id}).populate("categories_id");
	
		console.log("product", product);
	
		if (!product) {
		res.status(500).json({
			success: false,
			message: "Product not found",
		});
		}
		res.send(product);
	});
	/**
	 * @param {count}
	 * lấy giới hạn số lượng sản phẩm
	 */
	router.get(`/get/product/:count`, async (req, res) => {
		const count = req.params.count ? req.params.count : 0;
		const products = await Prod.find({}).limit(+count);
		console.log("count", +count);
		if (!products) {
		res.status(500).json({
			success: false,
		});
		}
		res.send(products);
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
	router.post(`/toCart`, async (req, res) => {	
		let id = req.body.id;
		let quantity = req.body.quantity;
		const product = await Prod.findById(req.body.id).populate(
			"id_Category"
		);
		let itemPrice = product.price;
		let total = itemPrice * quantity;
		let Cart = new carts({
			nameProduct: product.name,
			price:itemPrice,
			img: product.image ,
			description: product.description,
			quantity: quantity ,
			totalPrice: total,
			id_Prod: id
		});
		Cart = await Cart.save();
	
		if (!Cart) return res.status(500).send("The product cannot be created");
	
		res.send(Cart);
	});

	/**
	 * 
	 * đơn đặt hàng
	 */
	router.post(`/purchase_order`, async (req, res) => {	

		let quantity = req.body.quantity;
		const product = await Prod.findById(req.body.id).populate(
			"id_Category"
		);
		console.log("đơn đặt hàng:" + product.id);
		let itemPrice = product.price;
		let total = itemPrice * quantity;
		let purchase_orders = new purchase_order({
			name: product.name,
			price: itemPrice,
			image: product.image ,
			description: product.description,
			quantity: quantity ,
			id_product: product._id,
			id_category: product.id_Category,
			totalPrice: total,
			sizes: product.sizes
		});
		purchase_orders = await purchase_orders.save();
	
		if (!purchase_orders) return res.status(500).send("The product cannot be purchase_orders");
	
		res.send(purchase_orders);
	});
	router.get("/getToCart",productController.getToCart);
	router.post("/DeleteToCart",async (req,res,next)=>{
		const {id} = req.body;
		 await productController.deleteCart()
	});
	
module.exports = router;
