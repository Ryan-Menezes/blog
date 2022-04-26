const express = require('express')
const router = express.Router()

// Controllers
const AuthController = require('../../app/controllers/panel/AuthController')

// Routes
router.get('/', AuthController.index)
router.post('/validar', AuthController.validate)

module.exports = router