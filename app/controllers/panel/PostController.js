const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = 'panel/posts/'
const url = '/painel/postagens/'

module.exports = {
    index: async (req, res, next) => {
        if(!req.helpers.can('view.posts')){
            return req.helpers.server_error(404, res)
        }

        const total = await Post.count()

        Post.find().sort({
            created_at: -1
        }).skip(req.page).limit(req.config.pagination.limit).lean()
        .then(posts => {
            res.render(`${path}index`, {
                layout: 'panel',
                title: 'Postagens',
                posts,
                pages: total / req.config.pagination.limit
            }) 
        })
        .catch(error => {
            res.render(`${path}index`, {
                layout: 'panel',
                title: 'Postagens',
                posts: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as postagens do sistema!']
            })
        })
    },

    create: async (req, res, next) => {
        if(!req.helpers.can('create.posts')){
            return req.helpers.server_error(404, res)
        }

        Category.find().lean()
        .then(categories => {
            res.render(`${path}create`, {
                layout: 'panel',
                title: 'Nova Categoriaa',
                categories
            }) 
        })
        .catch(error => {
            res.render(`${path}create`, {
                layout: 'panel',
                title: 'Nova Categoria',
                categories: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as categorias para cadastro!']
            })
        })
    },

    store: async (req, res, next) => {
        if(!req.helpers.can('create.posts')){
            return req.helpers.server_error(404, res)
        }

        const data = req.body

        data.slug = data.slug ? req.helpers.slugify(data.slug) : req.helpers.slugify(data.title)

        const post = new Post({
            title: data.title,
            slug: data.slug,
            description: data.description,
            content: data.content,
            visible: data.visible,
            categories: data.categories
        })

        post.save()
        .then(result => {
            req.flash('msg_successes', ['Postagem cadastrada com sucesso!'])
            res.redirect(`${url}novo`)
        })
        .catch(error => {
            req.flash('msg_errors', req.helpers.error_parser(error))
            res.redirect(`${url}novo`)
        })
    },

    edit: async (req, res, next) => {
        if(!req.helpers.can('edit.posts')){
            return req.helpers.server_error(404, res)
        }

        Post.findOne({
            _id: req.params.id
        }).lean()
        .then(post => {
            if(!post){
                return req.helpers.server_error(404, res)
            }

            Category.find().lean()
            .then(categories => {
                res.render(`${path}edit`, {
                    layout: 'panel',
                    title: 'Editar Categoria',
                    categories,
                    post
                }) 
            })
            .catch(error => {
                res.render(`${path}edit`, {
                    layout: 'panel',
                    title: 'Editar Categoria',
                    categories: [],
                    post,
                    error,
                    errors: ['Ocorreu um erro ao tentar listar as categorias para edi????o!']
                })
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    },

    update: async (req, res, next) => {
        if(!req.helpers.can('edit.posts')){
            req.helpers.server_error(404, res)
        }

        const id = req.params.id
        const data = req.body

        data.slug = data.slug ? req.helpers.slugify(data.slug) : req.helpers.slugify(data.title)

        Post.findOne({
            _id: id
        }).lean()
        .then(post => {
            if(!post){
                return req.helpers.server_error(404, res)
            }

            Post.updateOne({
                _id: id
            }, {
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content,
                visible: data.visible,
                categories: data.categories
            })
            .then(result => {
                req.flash('msg_successes', ['Postagem editada com sucesso!'])
                res.redirect(`${url}${id}/editar`)
            })
            .catch(error => {
                req.flash('msg_errors', req.helpers.error_parser(error))
                res.redirect(`${url}${id}/editar`)
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    },

    delete: async (req, res, next) => {
        if(!req.helpers.can('delete.posts')){
            return req.helpers.server_error(404, res)
        }

        const id = req.params.id

        Post.findOne({
            _id: id
        }).lean()
        .then(post => {
            if(!post){
                return req.helpers.server_error(404, res)
            }

            Post.deleteOne({
                _id: id
            })
            .then(result => {
                req.flash('msg_successes', ['Postagem deletada com sucesso!'])
                res.redirect(url)
            })
            .catch(error => {
                req.flash('msg_errors', req.helpers.error_parser(error))
                res.redirect(url)
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    }
}