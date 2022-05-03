const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = 'site/posts/'
const url = '/postagens/'

module.exports = {
    show: async (req, res, next) => {
        Post.findOne({
            slug: req.params.slug
        }).populate('categories').lean()
        .then(post => {
            if(!post){
                return req.helpers.server_error(404, res)
            }

            Category.find().lean()
            .then(categories => {
                res.render(`${path}show`, {
                    layout: 'site',
                    categories,
                    post
                }) 
            })
            .catch(error => {
                res.render(`${path}show`, {
                    layout: 'site',
                    categories: [],
                    post,
                    error,
                    errors: ['Ocorreu um erro ao tentar listar as categorias!']
                })
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    }
}