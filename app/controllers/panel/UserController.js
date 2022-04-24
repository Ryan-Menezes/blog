const User = require('../../models/User')
const Role = require('../../models/Role')
const bcrypt = require('bcryptjs')
const path = 'panel/users/'
const url = '/painel/usuarios/'

module.exports = {
    index: async (req, res, next) => {
        User.find().populate('role').skip(req.page).limit(req.config.pagination.limit).lean()
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

        bcrypt.genSalt(req.config.password.salt, (error, salt) => {
            if(error){
                req.flash('msg_errors', ['Não foi possível registrar um novo usuário, Ocorreu um erro no processo de registro!'])
                return res.redirect(`${url}novo`)
            }

            bcrypt.hash(user.password, salt, (error, hash) => {
                if(error){
                    req.flash('msg_errors', ['Não foi possível registrar um novo usuário, Ocorreu um erro no processo de registro!'])
                    return res.redirect(`${url}novo`)
                }

                user.password = hash

                user.save()
                .then(result => {
                    req.flash('msg_successes', ['Usuário cadastrado com sucesso!'])
                    res.redirect(`${url}novo`)
                })
                .catch(error => {
                    req.flash('msg_errors', req.helpers.error_parser(error))
                    res.redirect(`${url}novo`)
                })
            })
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
        .then(async (user) => {
            if(!user){
                return req.helpers.server_error(404, res)
            }

            // Verifica se houve uma alteração de senha
            if(data.password){
                data.password = await bcrypt.hashSync(data.password, req.config.password.salt)
            }else{
                data.password = user.password
            }

            // Atualiza o usuário
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
                req.flash('msg_successes', ['Usuário editado com sucesso!'])
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

        User.findOne({
            _id: id
        }).lean()
        .then(user => {
            if(!user){
                return req.helpers.server_error(404, res)
            }

            User.deleteOne({
                _id: id
            })
            .then(result => {
                req.flash('msg_successes', ['Usuário deletada com sucessso!'])
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