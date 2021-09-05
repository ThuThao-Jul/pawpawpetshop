const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
    cart: [{type: Schema.Types.ObjectId, ref: "Cart"}],
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

userSchema.methods.generateToken = async function () {
    const accessToken = await jwt.sign({_id:this._id}, JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
    return accessToken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;