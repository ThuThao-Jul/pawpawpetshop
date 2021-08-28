const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    name: String,
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    pet: [{type: Schema.ObjectId, ref: "Pet"}],
    cart: [{type: Schema.ObjectId, ref: "Product"}],
    order: [{type: Schema.ObjectId, ref: "Order"}],
    schedule: [{type: Schema.ObjectId, ref: "Schedule"}],
    point: {type: Number, default: 0},
    reward: [{type: Schema.ObjectId, ref: "Product"}],
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;