const jwt = require("jsonwebtoken");
// const { token } = require("morgan");

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.Token;
    if (authHeader) {
        const Token = authHeader.split(" ")[1];
        jwt.verify(Token,process.env.ACCESS_SECRET_TOKEN, (err,user) => {
            if (err) {
                res.status(401).json("Token không hợp lệ");
            }
            req.user = user;
            next();
        })
    } else{
        return res.status(401).json("Tài khoản chưa được xác thực");
    }
}

const verifyTokenAndAuthoriation = (req,res,next) =>{
    verifyToken(req,res,() =>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else{
            res.status(403).json("Bạn chưa được cấp quyền!")
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthoriation};