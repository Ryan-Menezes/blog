const express = require('express')
const router = express.Router()

// Controllers
const PermissionController = require('../../app/controllers/panel/PermissionController')

// Routes
router.get('/', PermissionController.index)
router.get('/:id', PermissionController.show)

module.exports = router