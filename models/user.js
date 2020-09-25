const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseHistory = require('mongoose-history')

const UserSchema = new Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password : { 
        type: String,
        required: true
    }
}, { timestamps: true })

UserSchema.plugin(mongooseHistory)
module.exports = mongoose.model('User', UserSchema)
