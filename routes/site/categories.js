const express = require('express')
const router = express.Router()

// Controllers
const CategoryController = require('../../app/controllers/site/CategoryController')

// Routes
router.get('/:slug', CategoryController.show)

module.exports = router