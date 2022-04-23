const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'O campo nome é obrigatório']
    },
    slug: {
        type: String,
        required: [true, 'O campo slug é obrigatório']
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categories', CategorySchema)

module.exports = mongoose.model('categories')