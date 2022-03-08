const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const CategoriesModels = new Schema(
    {
        name : {
            type : Number,
            required: true
        },
        image:{
            type: Schema.Types.Array,
            ref: "productions"
        },
        sizes : {
            type: Schema.Types.Array,
            ref: "productions"
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model('categories',CategoriesModels);