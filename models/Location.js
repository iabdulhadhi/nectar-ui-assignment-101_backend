const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    NickName: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    PostalCode: {
        type: Number,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);
