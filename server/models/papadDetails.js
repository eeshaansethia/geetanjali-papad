const mongoose = require('mongoose');

const papadDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    ingredients: {
        type: Array
    },
    value: {
        type: Number
    },
});

module.exports = mongoose.model('papadDetails', papadDetails, 'papadDetails');
