const Role = require('../../models/Role')
const path = 'panel/roles/'

module.exports = {
    index: async (req, res, next) => {
        res.render(`${path}index`, {
            layout: 'panel'
        })
    },

    create: async (req, res, next) => {
        res.render(`${path}create`, {
            layout: 'panel'
        })
    },

    store: async (req, res, next) => {
        
    },

    edit: async (req, res, next) => {
        res.render(`${path}edit`, {
            layout: 'panel'
        })
    },

    update: async (req, res, next) => {
        
    }
}