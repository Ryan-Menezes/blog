const Permission = require('../../models/Permission')
const Role = require('../../models/Role')
const path = 'panel/roles/'
const url = '/painel/funcoes/'

module.exports = {
    index: async (req, res, next) => {
        if(!req.helpers.can('view.roles')){
            req.helpers.server_error(404, res)
        }

        const total = await Role.count()

        Role.find().sort({
            created_at: -1
        }).skip(req.page).limit(req.config.pagination.limit).lean()
        .then(roles => {
            res.render(`${path}index`, {
                layout: 'panel',
                roles,
                pages: total / req.config.pagination.limit
            }) 
        })
        .catch(error => {
            res.render(`${path}index`, {
                layout: 'panel',
                roles: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as funções do sistema!']
            })
        })
    },

    create: async (req, res, next) => {
        if(!req.helpers.can('create.roles')){
            req.helpers.server_error(404, res)
        }

        Permission.find().lean()
        .then(permissions => {
            res.render(`${path}create`, {
                layout: 'panel',
                permissions
            }) 
        })
        .catch(error => {
            res.render(`${path}create`, {
                layout: 'panel',
                permissions: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as permissões para cadastro!']
            })
        })
    },

    store: async (req, res, next) => {
        if(!req.helpers.can('create.roles')){
            req.helpers.server_error(404, res)
        }

        const data = req.body

        const role = new Role({
            name: data.name,
            description: data.description,
            permissions: data.permissions
        })

        role.save()
        .then(result => {
            req.flash('msg_successes', ['Função cadastrada com sucesso!'])
            res.redirect(`${url}novo`)
        })
        .catch(error => {
            req.flash('msg_errors', req.helpers.error_parser(error))
            res.redirect(`${url}novo`)
        })
    },

    edit: async (req, res, next) => {
        if(!req.helpers.can('edit.roles')){
            req.helpers.server_error(404, res)
        }

        Role.findOne({
            _id: req.params.id
        }).lean()
        .then(role => {
            if(!role){
                return req.helpers.server_error(404, res)
            }

            Permission.find().lean()
            .then(permissions => {
                res.render(`${path}edit`, {
                    layout: 'panel',
                    permissions,
                    role
                }) 
            })
            .catch(error => {
                res.render(`${path}edit`, {
                    layout: 'panel',
                    permissions: [],
                    role,
                    error,
                    errors: ['Ocorreu um erro ao tentar listar as permissões para edição!']
                })
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    },

    update: async (req, res, next) => {
        if(!req.helpers.can('edit.roles')){
            req.helpers.server_error(404, res)
        }

        const id = req.params.id
        const data = req.body

        Role.findOne({
            _id: id
        }).lean()
        .then(role => {
            if(!role){
                return req.helpers.server_error(404, res)
            }

            Role.updateOne({
                _id: id
            }, {
                name: data.name,
                description: data.description,
                permissions: data.permissions
            })
            .then(result => {
                req.flash('msg_successes', ['Função editada com sucesso!'])
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
        if(!req.helpers.can('delete.roles')){
            req.helpers.server_error(404, res)
        }

        const id = req.params.id

        Role.findOne({
            _id: id
        }).lean()
        .then(role => {
            if(!role){
                return req.helpers.server_error(404, res)
            }

            Role.deleteOne({
                _id: id
            })
            .then(result => {
                req.flash('msg_successes', ['Função deletada com sucesso!'])
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