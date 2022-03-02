const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productModels = new Schema({
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
        discount : {
            type : String,
        },
        description : {
            type : String,
            required: true
        },
        banner:{
            type: String,
        },
        thumb:{
            type: String,
        },
        star:{
            type: String,
        },
        categoris:{
            type: Schema.Types.ObjectId,
            ref: "category"
        },
        sizes:{
            type: Schema.Types.Array,
            ref: "sizes"
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('productions',productModels);
