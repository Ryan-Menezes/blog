const express = require('express')
const router = express.Router()

// Controllers
const PanelController = require('../../app/controllers/panel/PanelController')

// Routes
router.get('/', PanelController.index)

module.exports = router