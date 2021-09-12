const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const competitionSchema = Schema({
    name: {type: String, require: true},
    competitors: [{
        pet: {type: Schema.Types.ObjectId, ref: 'Pet'},
        vote: Number
    }],
    from: {type: Date, require: true},
    to: {type: Date, require: true},
    result: {
        winner: {type: Schema.Types.ObjectId, ref: "Pet"},
        vote: Number
    }
}, {
    timestamps: true
});

const Competition = mongoose.model('Competition', competitionSchema);
module.exports = Competition;