const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const purchaseOrderModels = new Schema({
        name : {
            type : String,
            required: true
        },
        image : {
            type : String,
        },
        price: {
            type : Number,
            required: true
        },
        quantity : {
            type : String,
            required: true
        },
        totalPrice:{
            type:Number,
        },
        discount : {
            type : String,
        },
        description : {
            type : String,
            required: true
        },
        star:{
            type: String,
        },
        id_product:{
            type:Schema.Types.ObjectId,
            ref:"productions"
        },
        id_category: { 
            type: Schema.Types.ObjectId,
            ref: "categories"
        },
        sizes:{
            type: Array,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('purchase_order',purchaseOrderModels);
