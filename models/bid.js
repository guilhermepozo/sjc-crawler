const mongoose = require('mongoose');


const bidsSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },

    status: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

});

const Bid = mongoose.model('Bids', bidsSchema);

module.exports =  Bid;
