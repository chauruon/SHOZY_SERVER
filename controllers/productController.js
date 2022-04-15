const User = require('../models/userModel');
const Prod = require('../models/productModels');
const Cart = require('../models/cartModels');
const {check, toastrsuccess, toastrerror, toastrwarning} = require('../common/auth');
const servicesPro = require('../services/product')
// CREATE PRODUCT
exports.createProduct = (infoProd) => {
    console.log(infoProd);
    servicesPro.create_pro(infoProd);
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
//GET ALL PRODUCTS
exports.get_product = (req, res) => {
    try {
        Prod.find({})
        .then(data => {
            if(data){
                res.status(200).json({
                    status:true,
                    data:data
                })
            }})
        .catch(err =>{
            res.status(400).json({
                status:false,
                message:'Not Found',
                err: err.message
            })
          return data
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:'Lấy danh sách thất!',
            data : err.message
        })
    }
}

exports.getListProducts = async function getListProducts() {
    return await servicesPro.getListProducts()
}

// DELETE PRODUCTS
exports.delete_product = async (req, res) =>{
    var id_delete = req.params.id ? {_id:req.params.id} : {};
    try {
        product.findByIdAndDelete(id_delete,(err,data) => {
            if(err){
                res.status(400).send({
                    status:false,
                    message:'Xóa thất bại',
                    err : err.message
                })
            }else if(!data){
                res.status(500).send({ 
                    'status': false,
                    'message': 'Server lỗi',
                    'data' : err.message
                })
            }else{
                res.status(200).send({
                    'status':true,
                    'message': 'Xóa thành công',
                    'data' : data
                })
            }
        })
    } catch (err) {
        res.status(500).send({
            status:false,
            message:'',
            error: err.message,
        })
    }
}




// Shopping cart
exports.toCart = async (id) => {
    let cart = {}
    let pro = await Prod.findById(id)
    console.log(pro);
	if (pro) {
		cart.nameProduct = pro.name
		cart.price = pro.price
		cart.description = pro.description
		cart.quantity = pro.quantity
        cart.idProd = pro.id
		if (pro.image) {
			cart.img = pro.image
		}
		
	}
    servicesPro.toCart(cart);
};

exports.delete= async (req,res) =>{
    // var id_delete = req.params.id ? {_id:req.params.id} : {};
    Prod.remove();
}
exports.deleteCart= async (req,res) =>{
    // var id_delete = req.params.id ? {_id:req.params.id} : {};
    Cart.remove({});
}

exports.getToCart = async (req, res) =>{
    var id_prod = req.params.id ? {_id:req.params.id} : {};
    try {
        Cart.find({})
        .then(data => {
            if(data){
                res.status(200).json({
                    status:true,
                    data:data
                })
            }})
        .catch(err =>{
            res.status(400).json({
                status:false,
                message:'Not Found',
                err: err.message
            })
          return data
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:'Lấy danh sách thất!',
            data : err.message
        })
    }
}













// update sản phẩm
exports.update_productsdfsdfsdffa = (req, res) => {
    var id_updates = req.params.id ? {_id :req.params.id}: {};
    product.findByIdAndUpdate(id_updates,{
        picture : req.body.picture,
        name : req.body.name,
        price : req.body.price,
        size : req.body.size,
        info : req.body.info,
    }).catch(err =>{
       return res.status(400).send({
            status:false,
            message:'Cập nhật thất bại',
            err : err
        })
    }).then(data =>{
       if(!data){
          return res.status(500).send({
            status:false,
            message:'Cập nhật thất bại',
           })
       }else{
        res.status(200).send({ 
            status: 200,
            message: 'Cập nhật thành công',
            data : data
        })
       }
    })
}