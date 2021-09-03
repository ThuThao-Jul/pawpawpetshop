const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    service: {type: Schema.Types.ObjectId, ref: "Service"},
    date: {type: Date, require: true},
    time: {
        require: true,
        type: String,
        enum: {
            values: ['8:30 AM', '9:30 AM', '10:30 AM', '2:00 PM', '3:00 PM', '4:00 PM']
        }
    },
    isDone: {type: Boolean, default: false},
},
{
    timestamps: true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;