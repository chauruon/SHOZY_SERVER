const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const cartModels = new Schema(
    {
        nameProduct : {type: String},
        price : {type: Number},
        description : {type: String},
        img : {type: String},
        quantity : {type: Number},
        idProd : {type: String},
    },
    {timestamps: true}
);
module.exports = mongoose.model('carts',cartModels);