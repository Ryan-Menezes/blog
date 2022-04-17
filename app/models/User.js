const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'roles',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('users', UserSchema)

module.exports = mongoose.model('users')