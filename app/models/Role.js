const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    permissions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'permissions'
        }
    ],
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('roles', RoleSchema)

module.exports = mongoose.model('roles')