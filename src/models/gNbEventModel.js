const mongoose= require('mongoose');

const dataSchema = new mongoose.Schema({
    start_time: {
        required: true,
        type: Date,
        default: Date.now
    },
    end_time: {
        required: false,
        type: Date,
    },
    cell_id: {
        required: true,
        type: String,
    },
    description: {
        required: false,
        type: String,
    },
    last_time: {
        required: false,
        type: Date,
    }
})

module.exports = mongoose.model('gNbEvent', dataSchema)