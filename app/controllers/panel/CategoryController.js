const Category = require('../../models/Category')
const path = 'panel/categories/'
const url = '/painel/categorias/'

module.exports = {
    index: async (req, res, next) => {
        Category.find().skip(req.page).limit(req.config.pagination.limit).lean()
        .then(categories => {
            res.render(`${path}index`, {
                layout: 'panel',
                categories
            }) 
        })
        .catch(error => {
            res.render(`${path}index`, {
                layout: 'panel',
                categories: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as categorias do sistema!']
            })
        })
    },

    create: async (req, res, next) => {
        res.render(`${path}create`, {
            layout: 'panel'
        })
    },

    store: async (req, res, next) => {
        const data = req.body

        const category = new Category({
            name: data.name,
            slug: data.slug,
            description: data.description
        })

        category.save()
        .then(result => {
            req.flash('msg_successes', ['Categoria cadastrada com sucesso!'])
            res.redirect(`${url}novo`)
        })
        .catch(error => {
            req.flash('msg_errors', req.helpers.error_parser(error))
            res.redirect(`${url}novo`)
        })
    },

    edit: async (req, res, next) => {
        Category.findOne({
            _id: req.params.id
        }).lean()
        .then(category => {
            if(!category){
                return req.helpers.server_error(404, res)
            }

            res.render(`${path}edit`, {
                layout: 'panel',
                category
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    },

    update: async (req, res, next) => {
        const id = req.params.id
        const data = req.body

        Category.findOne({
            _id: id
        }).lean()
        .then(category => {
            if(!category){
                return req.helpers.server_error(404, res)
            }

            Category.updateOne({
                _id: id
            }, {
                name: data.name,
                slug: data.slug,
                description: data.description
            })
            .then(result => {
                req.flash('msg_successes', ['Categoria editada com sucesso!'])
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
        const id = req.params.id

        Category.findOne({
            _id: id
        }).lean()
        .then(category => {
            if(!category){
                return req.helpers.server_error(404, res)
            }

            Category.deleteOne({
                _id: id
            })
            .then(result => {
                req.flash('msg_successes', ['Categoria deletada com sucessso!'])
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