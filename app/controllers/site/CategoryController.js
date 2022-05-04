const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = 'site/categories/'
const url = '/categories/'

module.exports = {
    show: async (req, res, next) => {
        Category.findOne({
            slug: req.params.slug
        }).lean()
        .then(category => {
            if(!category){
                return req.helpers.server_error(404, res)
            }

            Post.find({
                categories: category._id,
                visible: true
            }).populate('categories').lean()
            .then(posts => {
                Category.find().lean()
                .then(categories => {
                    res.render(`${path}show`, {
                        layout: 'site',
                        title: category.name,
                        categories,
                        category,
                        posts
                    }) 
                })
                .catch(error => {
                    res.render(`${path}show`, {
                        layout: 'site',
                        title: category.name,
                        categories: [],
                        category,
                        posts,
                        error,
                        errors: ['Ocorreu um erro ao tentar listar as categorias!']
                    })
                })
            })
            .catch(error => {
                req.helpers.server_error(404, res)
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    }
}