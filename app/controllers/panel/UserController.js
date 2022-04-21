const User = require('../../models/User')
const Role = require('../../models/Role')
const path = 'panel/users/'
const url = '/painel/usuarios/'

module.exports = {
    index: async (req, res, next) => {
        User.find().skip(req.page).limit(req.config.pagination.limit).lean()
        .then(users => {
            res.render(`${path}index`, {
                layout: 'panel',
                users
            }) 
        })
        .catch(error => {
            res.render(`${path}index`, {
                layout: 'panel',
                users: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar os usuários do sistema!']
            })
        })
    },

    create: async (req, res, next) => {
        Role.find().lean()
        .then(roles => {
            res.render(`${path}create`, {
                layout: 'panel',
                roles
            }) 
        })
        .catch(error => {
            res.render(`${path}create`, {
                layout: 'panel',
                roles: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as funções para cadastro!']
            })
        })
    },

    store: async (req, res, next) => {
        const data = req.body

        const user = new User({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            role: data.role
        })

        user.save()
        .then(result => {
            req.flash('msg_successes', ['Usuário cadastrado com sucessso!'])
            res.redirect(`${url}novo`)
        })
        .catch(error => {
            req.flash('msg_errors', req.helpers.error_parser(error))
            res.redirect(`${url}novo`)
        })
    },

    edit: async (req, res, next) => {
        User.findOne({
            _id: req.params.id
        }).lean()
        .then(user => {
            if(!user){
                return req.helpers.server_error(404, res)
            }

            Role.find().lean()
            .then(roles => {
                res.render(`${path}edit`, {
                    layout: 'panel',
                    roles,
                    user
                }) 
            })
            .catch(error => {
                res.render(`${path}edit`, {
                    layout: 'panel',
                    roles: [],
                    user,
                    error,
                    errors: ['Ocorreu um erro ao tentar listar as funções para edição!']
                })
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    },

    update: async (req, res, next) => {
        const id = req.params.id
        const data = req.body

        User.findOne({
            _id: id
        }).lean()
        .then(user => {
            if(!user){
                return req.helpers.server_error(404, res)
            }

            User.updateOne({
                _id: id
            }, {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                role: data.role
            })
            .then(result => {
                req.flash('msg_successes', ['Usuário editado com sucessso!'])
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
    }
}