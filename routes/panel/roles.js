const express = require('express')
const router = express.Router()

// Controllers
const RoleController = require('../../app/controllers/panel/RoleController')

// Routes
router.get('/', RoleController.index)
router.get('/novo', RoleController.create)
router.post('/novo/salvar', RoleController.store)
router.get('/:id/editar', RoleController.edit)
router.post('/:id/editar/salvar', RoleController.update)
router.post('/:id/deletar', RoleController.delete)

module.exports = router