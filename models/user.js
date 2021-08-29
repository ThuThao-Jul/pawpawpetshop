const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    name: String,
    role: {
        type: String,
        enum: {
            values: ["user", "admin"]
        },
        default: "user"
    },
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    pet: [{type: Schema.Types.ObjectId, ref: "Pet"}],
    cart: [{type: Schema.Types.ObjectId, ref: "Product"}],
    order: [{type: Schema.Types.ObjectId, ref: "Order"}],
    schedule: [{type: Schema.Types.ObjectId, ref: "Schedule"}],
    point: {type: Number, default: 0},
    reward: [{
        item: {type: Schema.Types.ObjectId, ref: "Product"},
        isReceived: {type: Boolean, default: false}
    }],
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;