const express = require('express')
const router = express.Router()

// Controllers
const PostController = require('../../app/controllers/panel/PostController')

// Routes
router.get('/', PostController.index)
router.get('/novo', PostController.create)
router.post('/novo/salvar', PostController.store)
router.get('/:id/editar', PostController.edit)
router.post('/:id/editar/salvar', PostController.update)

module.exports = router