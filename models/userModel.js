const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userModels = new Schema(
    {
        numPhone : {
            type : Number,
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
            required: true
        },
        isAdmin : {
            type : Boolean,
        },
        cart_id: [
            {
              type: Schema.Types.ObjectId,
              ref: 'carts'
            }
        ],
    },
    {timestamps: true}
);
module.exports = mongoose.model('users',userModels);