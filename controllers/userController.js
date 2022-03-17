const User = require('../models/userModel');
const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
const {verifyToken,verifyTokenAndAuthoriation} = require('../common/verifyToken');
const {loginUser} = require('../services/user')
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
            
	const{numPhone, username,password, address} = req.body;
	try {
		const newuser = new User({
			numPhone : numPhone,
			username : username,
			isAdmin: false,
			password : CryptoJS.AES.encrypt(req.body.password,process.env.ACCESS_SECRET).toString(),
			address : address,
		});
		
		const userRegiter = await newuser.save();
		return res.status(200).json({
			status: true,
			data:{
				...userRegiter._doc,
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

// exports.login = async (userInfo) =>{
// 	console.log(userInfo);
// 	const user = await User.findOne({numPhone: userInfo.numPhone})
// 	const hashPass = CryptoJS.AES.decrypt(user.password,process.env.ACCESS_SECRET).toString(CryptoJS.enc.Utf8);
// 	const accessToken = jwt.sign({
// 			id: User._id,
// 		},
// 		process.env.ACCESS_SECRET_TOKEN,
// 		{expiresIn:"3d"}
// 	);
// 	const { password, ...others } = user._doc;
// 	const info = {
// 		accessToken : accessToken,
// 		others: others,
// 		hashPass: hashPass,
// 		password: userInfo.password
// 	}
// 	loginUser(info)
// };

exports.login = async (userInfo) =>{
	const user = await User.findOne({numPhone: userInfo.numPhone})
	const hashPass = CryptoJS.AES.decrypt(user.password,process.env.ACCESS_SECRET).toString(CryptoJS.enc.Utf8);
console.log("hashPass%%%%%%%%%%%%: " + hashPass);
	const accessToken = jwt.sign({
			id: User._id,
		},
		process.env.ACCESS_SECRET_TOKEN,
		{expiresIn:"3d"}
	);
	const { password, ...others } = user._doc;
	const info = {
		accessToken : accessToken,
		others: others,
		hashPass: hashPass,
		user: user,
	}
	loginUser(info)
};


exports.updateUser = async (req,res,next) =>{
		verifyTokenAndAuthoriation();

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
};


