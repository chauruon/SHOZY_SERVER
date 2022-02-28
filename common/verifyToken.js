const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token;
    console.log("REQUEST FROM HEADERS: " + authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log("Token reuested::::::: " + token);
        jwt.verify(token,process.env.ACCESS_SECRET_TOKEN, (err,user) => {
            console.log("USER ACCESS TOKEN:::::" +  JSON.stringify(user));
            if (err) {
                res.status(401).json("Token không hợp lệ");
            }
            req.user = User;
            next();
        })
    } else{
        return res.status(401).json("Tài khoản chưa được xác thực");
    }
}

const verifyTokenAndAuthoriation = (req,res,next) =>{
    verifyToken(req,res,() =>{
        console.log("asdfsdfsdfsdfsafdsafsdf@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+ req.User.id);
        if (req.User.id === req.params.id || req.User.isAdmin) {
            next();
        } else{
            res.status(403).json("Bạn chưa được cấp quyền!")
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthoriation};