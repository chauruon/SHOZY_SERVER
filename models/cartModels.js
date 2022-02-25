const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const cartModels = new Schema(
    {
        name : {
            type : Number,
            required: true
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model('carts',cartModels);