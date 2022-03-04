const Prod = require('../models/productModels');

function create_pro(req,res,infoProd) {
    try {
        if(!infoProd.name && !infoProd.price && !infoProd.quantity){
            res.status(400).send({message:"Vui lòng nhập đủ thông tin sản phẩm"})
            return;
        }
        let new_product =  new Prod(infoProd);
        new_product.save(new_product).then(prod => {
            res.status(200).send({ 
                status: true,
                message: 'Thêm sản phẩm thành công!',
                data : [
                    prod
                ]
            });
        });
    } catch (err) {
        res.status(500).send({
            status:false,
            message:'Thêm thất bại',
            data : err.message
        })
    }
}

module.exports = {
    create_pro
}
