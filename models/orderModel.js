const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const orderModels = new Schema({
    name:{
        type: String,
    },
    desc: { 
        type: String,
        trim: true ,
        required: true
    },
    quatity:{
        type: Number,
        trim: true,
    },
    total:{
        type: Number,
        trim: true,
    },
    discount: { 
        type: Number,
        trim: true,
    },
    payment_method: { 
        type: String,
        trim: true,
    },
    user_id:[
        {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    ],
    cart_id:[{
        type: Schema.Types.ObjectId,
        ref: "carts",
    }],
    product_id:[{
        type: Schema.Types.ObjectId,
        ref: "productions",
    }],
    
});
module.exports = mongoose.model('orders',orderModels);