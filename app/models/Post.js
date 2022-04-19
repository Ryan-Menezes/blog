const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
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