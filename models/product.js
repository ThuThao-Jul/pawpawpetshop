const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
    name: {type: String, require: true, unique: true},
    category: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String},
    images: [{type: String, require: true}],
},
{
    timestamps: true,
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;