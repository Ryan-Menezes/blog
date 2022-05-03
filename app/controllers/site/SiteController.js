const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = 'site/'
const url = '/'

module.exports = {
    index: async (req, res, next) => {
        const total = await Post.count()

        Post.find().sort({
            created_at: -1
        }).populate('categories').skip(req.page).limit(req.config.pagination.limit).lean()
        .then(posts => {
            Category.find().sort({
                name: 1
            }).lean()
            .then(categories => {
                res.render(`${path}index`, {
                    layout: 'site',
                    posts,
                    categories,
                    pages: total / req.config.pagination.limit
                })
            })
            .catch(error => {
                res.render(`${path}index`, {
                    layout: 'site',
                    posts: [],
                    categories: [],
                    error,
                    errors: ['Ocorreu um erro ao tentar listar as categorias!']
                })
            })
        })
        .catch(error => {
            res.render(`${path}index`, {
                layout: 'site',
                posts: [],
                categories: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as postagens!']
            })
        })
    }
}