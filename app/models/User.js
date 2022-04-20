const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'O campo nome é obrigatório']
    },
    last_name: {
        type: String,
        required: [true, 'O campo sobrenome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O campo email é obrigatório'],
        unique: [true, 'Já existe um usuário cadastrado com este email']
    },
    password: {
        type: String,
        required: [true, 'O campo senha é obrigatório'],
        minlength: [8, 'O campo senha deve ter no minímo 8 caracteres']
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'roles',
        required: [true, 'O campo função é obrigatório']
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('users', UserSchema)

module.exports = mongoose.model('users')