const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = 'site/'
const url = '/'

module.exports = {
    index: async (req, res, next) => {
        const search = req.body.search ? req.body.search : ''
        const total = await Post.count({
            title: {
                $regex: search,
                $options: 'im'
            }
        })

        Post.find({
            title: {
                $regex: search,
                $options: 'im'
            }
        }).sort({
            created_at: -1
        }).populate('categories').skip(req.page).limit(req.config.pagination.limit).lean()
        .then(posts => {
            Category.find().sort({
                name: 1
            }).lean()
            .then(categories => {
                res.render(`${path}index`, {
                    layout: 'site',
                    title: 'Fique sempre por dentro das novidades',
                    posts,
                    categories,
                    pages: total / req.config.pagination.limit
                })
            })
            .catch(error => {
                res.render(`${path}index`, {
                    layout: 'site',
                    title: 'Fique sempre por dentro das novidades',
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