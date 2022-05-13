const Prod = require('../models/productModels');
const Cart = require('../models/cartModels');
const Sizes = require('../models/sizesModels');
function create_pro(infoProd,req,res,) {
	console.log("$$$$$$$$$$$$$$$$$$$$$$$$$: "+ JSON.stringify(infoProd));
 
	// if(!infoProd.name && !infoProd.price && !infoProd.quantity){
	// 	res.status(400).send({message:"Vui lòng nhập đủ thông tin sản phẩm"})
	// 	return;
	// }
	
	let new_product =  new Prod(infoProd);
	console.log(infoProd);
	let size_product =  new Sizes(infoProd);
	size_product.save();
	new_product.save(new_product).then(prod => {
		res.json({ 
			status: true,
			message: 'Thêm sản phẩm thành công!',
			data : [
				prod
			]
		});
	});
}

function toCart(product) {
	const cart = new Cart(product)
	console.log("REQ CART: " + cart);
	cart.save();
}

async function getListProducts() {
	let products = await Prod.find().populate('idCategory')
return products
}



module.exports = {
	create_pro,
	getListProducts,
	toCart,
}