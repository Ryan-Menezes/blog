const express = require('express')
const router = express.Router()

// Controllers
const UserController = require('../../app/controllers/panel/UserController')

// Routes
router.get('/', UserController.index)
router.get('/novo', UserController.create)
router.post('/novo/salvar', UserController.store)
router.get('/:id/editar', UserController.edit)
router.get('/:id/editar/salvar', UserController.update)

module.exports = router