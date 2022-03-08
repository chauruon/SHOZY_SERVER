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


function getpro(req,res) {
    try {
        Prod.find({})
        .then(data => {
          if(!data){
            res.status(500).send({
              status:false,
              message:'Server error!',
            })
            return data
          }else{
            res.status(200).send({
              status:true,
              data:data
            })
          }})
        .catch(err =>{
          res.status(400).send({
            status:false,
            message:'Not Found',
          })
          return data
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            message:'Lấy danh sách thất!',
            data : err.message
        })
    }
}

module.exports = {
    create_pro,
    getpro,
}
