const User = require('../../models/User')
const Role = require('../../models/Role')
const Permission = require('../../models/Permission')
const Category = require('../../models/Category')
const Post = require('../../models/Post')

const path = 'panel/'

module.exports = {
    index: async (req, res, next) => {
        res.render(`${path}index`, {
            layout: 'panel'
        })
    }
}