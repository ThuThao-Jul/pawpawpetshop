const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, require: true},
    birthday: Date,
    age: Number,
    male: Boolean,  
    type: {
        type: String,
        enum: ["dog", "cat", "other"],
        require: true,
    },
    images: [{type: String}],
    videos: [{type: String}],
    description: String,
    vaccinationRecord: Date,
    medicalRecord: String,
},
{
    timestamps: true,
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;