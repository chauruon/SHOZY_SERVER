const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const sizesModels = new Schema(
    {
        size : {type : Array,},
        idProd:{type: Schema.Types.ObjectId, ref: "productions"}
    },
    {timestamps: true}
);
module.exports = mongoose.model('sizes',sizesModels);