const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'categories'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categories', CategorySchema)

module.exports = mongoose.model('categories')