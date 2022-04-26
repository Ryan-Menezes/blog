const User = require('../../models/User')
const passport = require('passport')

const path = 'panel/auth/'
const url = '/painel/login/'

module.exports = {
    index: async (req, res, next) => {
        res.render(`${path}index`, {
            layout: 'auth'
        })
    },

    validate: async (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/painel',
            failureRedirect: url,
            failureFlash: true
        })(req, res, next)
    }
}