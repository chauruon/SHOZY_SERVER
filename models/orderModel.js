const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const orderModels = new Schema({
    name:{
        type: String,
    },
    description: { 
        type: String,
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
    users:[
        {
            type: Schema.Types.ObjectId,
            ref: "users",
        }
    ],
    carts:[{
        type: Schema.Types.ObjectId,
        ref: "carts",
    }],
    products:[{
        type: Schema.Types.ObjectId,
        ref: "productions",
    }],
    
});
module.exports = mongoose.model('orders',orderModels);