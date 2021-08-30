const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = Schema({
    name: {type: String, require: true, unique: true},
    type: {
        type: String,
        enum: {
            values: ['spa', 'healthcare'],
        },
        require: true,
    },
    price: {type: Number},
    description: {type: String, require: true},
    images: {type: String, require: true},
    isBooked: [{type: Schema.Types.ObjectId, ref: "Schedule"}],
},
{
    timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;