const express = require('express')
const router = express.Router()

// Controllers
const SiteController = require('../../app/controllers/site/SiteController')

// Routes
router.get('/', SiteController.index)

module.exports = router