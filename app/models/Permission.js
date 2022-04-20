const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermissionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O campo slug é obrigatório']
    },
    description: {
        type: String
    },
    roles: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'roles'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('permissions', PermissionSchema)

module.exports = mongoose.model('permissions')