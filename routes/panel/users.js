const express = require('express')
const router = express.Router()

// Controllers
const UserController = require('../../app/controllers/panel/UserController')

// Routes
router.get('/', UserController.index)
router.get('/novo', UserController.create)
router.post('/novo/salvar', UserController.store)
router.get('/:id/editar', UserController.edit)
router.post('/:id/editar/salvar', UserController.update)
router.post('/:id/deletar', UserController.delete)

module.exports = router