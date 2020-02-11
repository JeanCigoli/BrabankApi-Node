const router = require('express').Router();
const categoriaController = require('../app/controller/categorias');

router.get('/', categoriaController.listCategorias);

router.post('/', categoriaController.insert);

router.get('/:id', categoriaController.listById);

module.exports = router;