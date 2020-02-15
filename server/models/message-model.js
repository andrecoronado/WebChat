const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    datetime:{
        type: String,
    },
    liked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message