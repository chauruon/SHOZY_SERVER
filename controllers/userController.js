const User = require('../models/userModel');
const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {              
	const{numPhone, username,password, address} = req.body;
	try {
		const newuser = new User({
			numPhone : numPhone,
			username : username,
			isAdmin: true,
			password : CryptoJS.AES.encrypt(req.body.password,process.env.ACCESS_SECRET).toString(),
			address : address, 
		});
		
		const userRegiter = await newuser.save();
		return res.status(200).json({
			status: true,
			data:{
				userRegiter,
			}
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: false,
			message:"Vui lòng liêm hệ admin",
		});
	}
};

exports.login = async (req,res) =>{
	try {
		const user = await User.findOne({numPhone: req.body.numPhone})
		!user && res.status(401).json("Tài khoản đã tồn tại!");

		const hashPass = CryptoJS.AES.decrypt(user.password,process.env.ACCESS_SECRET).toString(CryptoJS.enc.Utf8);

		hashPass !== req.body.password && res.status(401).json("Tài khoản hoặc mật khậu không chính xác! Vui lòng nhập lại");
		const accessToken = jwt.sign(
			{
				id: User._id,
			},
			process.env.ACCESS_SECRET_TOKEN,
			{expiresIn:"3d"});
		const { password, ...others } = user._doc;

		res.status(200).json({
			status: true,
			data:{
				...others,
				accessToken
			}
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: false,
			message:"Vui lòng liêm hệ admin",
		});
	}
};


exports.updateUser = () =>{
	try {
		verifyTokenAndAuthoriation( async (req,res,next) => {
			if(req.body.password){
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
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: false,
			message:"Vui lòng liêm hệ admin",
		});
	}
};
