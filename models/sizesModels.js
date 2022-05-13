const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const sizesModels = new Schema(
    {
        size : {type : Array,},
        id_Prod:{type: Schema.Types.ObjectId, ref: "productions"}
    },
    {timestamps: true}
);
module.exports = mongoose.model('sizes',sizesModels);