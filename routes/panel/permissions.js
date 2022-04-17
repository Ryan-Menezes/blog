const express = require('express')
const router = express.Router()

// Controllers
const PermissionController = require('../../app/controllers/panel/PermissionController')

// Routes
router.get('/', PermissionController.index)
router.get('/novo', PermissionController.create)
router.post('/novo/salvar', PermissionController.store)
router.get('/:id/editar', PermissionController.edit)
router.get('/:id/editar/salvar', PermissionController.update)

module.exports = router