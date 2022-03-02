async function loginUser(req,res,info) {
	try {
        let others = info.others
        let accessToken = info.accessToken
        !info.user && res.status(401).json("Tài khoản đã tồn tại!");
        info.hashPass !== res.password && res.status(401).json("Tài khoản hoặc mật khậu không chính xác! Vui lòng nhập lại");
		res.status(200).json({
            status: true,
            data:{
                others,
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
}

module.exports = {
    loginUser
}