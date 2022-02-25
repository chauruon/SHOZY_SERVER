const User = require('../models/userModel');
const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
const CryptoJS = require('crypto-js');

// exports.signup = async (req, res) => {
// 	let newUser = new User({
// 		numPhone : req.body.numPhone,
// 		username: req.body.username,
// 		password: CryptoJS.AES.encrypt(req.body.password,process.env.ACCESS_SECRET).toString(),
// 		admin: true,
// 	});
// 	// console.log(`ĐÂY LÀ KHI LOG USER: ${newUser}`);
// 	await newUser.save();
// };

exports.signup = async (req, res) => {              
	const{numPhone, username,password, address} = req.body;
	// try {
		const newuser = new User({
			numPhone : numPhone,
			username : username,
			password : CryptoJS.AES.encrypt(req.body.password,process.env.ACCESS_SECRET).toString(),
			address : address,
		});
		// newuser.password = CryptoJS.AES.encrypt(req.body.password,process.env.ACCESS_SECRET).toString();
		const data = await newuser.save();
		return res.status(200).json(data)
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(400).json({msg:'Sever error'});
	// }
};
