const User = require('../models/userModel');
const Prod = require('../models/productModels');
const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');


exports.createProduct = (req,res) => {
    const input = req.body;
    if(!input.name && !input.price && !input.quantity){
        res.status(400).send({message:"Vui lòng nhập đủ thông tin sản phẩm"})
        return;
    }
    let new_product =  new Prod(req.body);
    new_product.save(new_product).then(data => {
        res.status(200).send({ 
            status: true,
            message: 'Thêm sản phẩm thành công!',
            data : data
        })
    }).catch(err => {
        res.status(500).send({
            status:false,
            message:'Thêm thất bại',
            data : err.message
        })
    })
};

// UPDATE PRODUCT
exports.update_product = (req, res) => {
    var id_updates = req.params.id ? {_id :req.params.id}: {};
    console.log(id_updates);
    Prod.findByIdAndUpdate(id_updates,{
        // picture : req.body.picture,
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        description : req.body.description,
    }).catch(err =>{
        if (res.status(400)) {
            return res.status(400).send({
                status:false,
                message:'Cập nhật thất bại',
                err : err.message
            })
        }
       
        return res.status(500).send({
            status:false,
            message:'Lỗi server',
            err : err.message
        })
    }).then(data =>{
       if(data){
           res.status(200).send({ 
            status: true,
            message: 'Cập nhật sản phẩm thành công',
            data : data
        })
        return res.status(500).send({
            status:false,
            message:'Cập nhật sản phẩm thất bại',
           })
       }
    })
}