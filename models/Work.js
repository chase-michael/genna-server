const mongoose = require('mongoose');
const { Schema } = mongoose;

let workSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    artistId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workCollection: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'works'
})

module.exports = mongoose.model('Work', workSchema);