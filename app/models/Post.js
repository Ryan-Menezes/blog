const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'O campo titulo é obrigatório']
    },
    slug: {
        type: String,
        required: [true, 'O campo slug é obrigatório']
    },
    tags: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'O campo descrição é obrigatório']
    },
    content: {
        type: String,
        required: [true, 'O campo conteúdo é obrigatório']
    },
    visible: {
        type: Boolean,
        default: false
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'categories'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('posts', PostSchema)

module.exports = mongoose.model('posts')