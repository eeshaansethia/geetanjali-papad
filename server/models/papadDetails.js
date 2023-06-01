const mongoose = require('mongoose');

const papadDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    pricing: {
        type: Number,
    },
    ingredients: {
        type: Object
    },
    values: {
        type: Number
    },
});

module.exports = mongoose.model('papadDetails', papadDetails, 'papadDetails');
