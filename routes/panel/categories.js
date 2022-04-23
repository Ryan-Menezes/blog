const express = require('express')
const router = express.Router()

// Controllers
const CategoryController = require('../../app/controllers/panel/CategoryController')

// Routes
router.get('/', CategoryController.index)
router.get('/novo', CategoryController.create)
router.post('/novo/salvar', CategoryController.store)
router.get('/:id/editar', CategoryController.edit)
router.post('/:id/editar/salvar', CategoryController.update)

module.exports = router