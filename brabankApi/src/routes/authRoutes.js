const router = require('express').Router();
const authController = require('../app/controller/public/autenticacao');
const Validar = require('../validator/validUsers');

router.post('/registrar', Validar.validacoes(), authController.registrar);

router.post('/autenticar', authController.autenticar);

module.exports = router;