const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    order: [{type: Schema.Types.ObjectId, ref: "Cart"}],
    address: {type: String, require: true},
    phone: {type: String, require: true},
    totalCost: Number,
    discount: Number,
    finalCost: Number,
    isPaid: {type: Boolean, default: false}
},
{
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;