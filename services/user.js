// async function loginUser(req,res,users) {
//     try {
//         console.log(`hash pass$$$$$: ${JSON.stringify(req)}`);
//         let inputUser = users.info;
//         let user = users.info.others;
//         let accessToken = inputUser.accessToken
//         !user && res.status(401).json("Tài khoản đã tồn tại!");
//         inputUser.hashPass !== inputUser.password && res.status(401).json("Tài khoản hoặc mật khậu không chính xác! Vui lòng nhập lại");
		
//         res.status(200).json({
//             status: true,
//             data:{
//                 user,
//                 accessToken
//             }
//         });
// 	} catch (err) {
//         console.log(err);
// 		res.status(400).json({
// 			status: false,
// 			message:"Vui lòng liêm hệ admin",
//             error: err
// 		});
// 	}
// }


async function loginUser(req,res,info) {
	try {
        let others = req.others
        // console.log("orther#########################: " + JSON.stringify(req.hashPass));
        let accessToken = req.accessToken
        !others.user && res.status(401).json("Tài khoản đã tồn tại!");
        // console.log("%%%%%%%%%%%%%%%%%%%: "+ res.password);
        req.hashPass !== res.password && res.status(401).json("Tài khoản hoặc mật khậu không chính xác! Vui lòng nhập lại");
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