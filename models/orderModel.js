const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const orderModels = new Schema({
    amounts: { 
        type: Number,
        trim: true,
        unique:true,
        required: true
    },
    title: { 
        type: String,
        trim: true,
    },
    desc: { 
        type: String,
        trim: true ,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        unique:true,
        required: true
    },
});
module.exports = mongoose.model('orders',orderModels);