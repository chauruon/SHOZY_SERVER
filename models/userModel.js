const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userModels = new Schema(
    {
        numPhone : {
            type : Int16Array,
            required: true
        },
        username : {
            type : String,
        },
        address : {
            type : String,
        },
        password : {
            type : String,
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model('Users',userModels);