const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const sizesModels = new Schema(
    {
        size : {
            type : Array,
            required: true
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model('sizes',sizesModels);