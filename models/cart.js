const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    product: {type: Schema.Types.ObjectId, ref: "Products"},
    quantity: {type: Number, require: true},
    isDeleted: {type: Boolean, default: false}
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;