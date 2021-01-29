const mongoose = require("mongoose");
const validator = require("validator");

const momentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    tags: {
        type: Array
    },
    images: {
        type: Array
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {
    timestamps: true,
})

const Moment = mongoose.model('moments', momentSchema);

module.exports = Moment;