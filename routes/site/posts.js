const express = require('express')
const router = express.Router()

// Controllers
const PostController = require('../../app/controllers/site/PostController')

// Routes
router.get('/:slug', PostController.show)

module.exports = router