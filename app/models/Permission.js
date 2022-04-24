const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermissionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório']
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('permissions', PermissionSchema)

module.exports = mongoose.model('permissions')