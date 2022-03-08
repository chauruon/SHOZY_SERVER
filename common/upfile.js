const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/products')
    },
    filename: function(req, file, cb){
        cb(null, file.image + '-' + Date.now())
    },
    
})
module.exports = 
    multer({storage: storage, limits: { fileSize: 4 * 1024 * 1024 }})