const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = Schema({
    owner: {type: Schema.ObjectId, ref: "User"},
    service: {type: Schema.ObjectId, ref: "Service"},
    date: {type: Date, require: true},
    time: {
        type: String,
        enum: {
            values: ['morning', 'afternoon']
        }
    },
    isDone: {type: Boolean, default: false},
},
{
    timestamps: true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;