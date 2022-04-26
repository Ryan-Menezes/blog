const User = require('../../models/User')
const Role = require('../../models/Role')
const Permission = require('../../models/Permission')
const Category = require('../../models/Category')
const Post = require('../../models/Post')

const path = 'panel/'

module.exports = {
    index: async (req, res, next) => {
        res.render(`${path}index`, {
            layout: 'panel',
            count: {
                users: await User.count(),
                posts: await Post.count(),
                categories: await Category.count(),
                roles: await Role.count(),
                permissions: await Permission.count()
            }
        })
    },

    logout: async (req, res, next) => {
        req.logout()
        res.redirect('/painel/login')
    }
}