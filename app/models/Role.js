const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório']
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
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('roles', RoleSchema)

module.exports = mongoose.model('roles')