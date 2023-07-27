const mongoose= require('mongoose');
const {Decimal128} = require("mongodb");

const dataSchema = new mongoose.Schema({
    record_type: {
        required: true,
        type: String,
    },
    created_at: {
        required: true,
        type: Date,
        default: Date.now
    },
    cell_id: {
        required: true,
        type: String,
        default: "0"
    },
    value: {
        required: false,
        type: Decimal128,
    },
})

module.exports = mongoose.model('gNbPerformanceRecord', dataSchema)