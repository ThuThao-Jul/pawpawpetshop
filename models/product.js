const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
    name: {type: String, require: true, unique: true},
    category: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String},
    images: [{type: String, require: true}],
    stock: {type: Number, require: true}
},);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;