const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    client: {
        ip: { 
            type: String,
            required: false,
            default: ''
        },
        host: { 
            type: String,
            required: false,
            default: ''
        },
        hostname: { 
            type: String,
            required: false,
            default: ''
        },
        id: { 
            type: String,
            required: false,
            default: ''
        }
    },
    actived: { 
        type: Boolean,
        required: false,
        default: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
}, { timestamps: true })

module.exports = mongoose.model('Session', SessionSchema)
