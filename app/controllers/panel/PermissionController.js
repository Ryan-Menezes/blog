const Permission = require('../../models/Permission')
const path = 'panel/permissions/'
const url = '/painel/permissoes/'

module.exports = {
    index: async (req, res, next) => {
        Permission.find().skip(req.page).limit(req.config.pagination.limit).lean()
        .then(permissions => {
            res.render(`${path}index`, {
                layout: 'panel',
                permissions
            }) 
        })
        .catch(error => {
            res.render(`${path}index`, {
                layout: 'panel',
                permissions: [],
                error,
                errors: ['Ocorreu um erro ao tentar listar as permissões do sistema!']
            })
        })
    },

    show: async (req, res, next) => {
        Permission.findOne({
            _id: req.params.id
        }).lean()
        .then(permission => {
            if(!permission){
                return req.helpers.server_error(404, res)
            }

            res.render(`${path}show`, {
                layout: 'panel',
                permission
            })
        })
        .catch(error => {
            req.helpers.server_error(404, res)
        })
    }
}