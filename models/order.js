const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    order: [{
       item: {type: Schema.Types.ObjectId, ref: "Product"},
       quantity: {type: Number, require: true}
    }],
    address: {type: String, require: true},
    phone: {type: String, require: true},
    isPaid: {type: Boolean, default: false}
},
{
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;