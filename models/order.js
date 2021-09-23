const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    order: [{type: Schema.Types.ObjectId, ref: "Cart"}],
    address: String,
    phone: String,
    totalCost: Number,
    discount: Number,
    finalCost: Number,
    isPaid: {type: Boolean, default: false},
    isDelivered: {type: Boolean, default: false}
},
{
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;