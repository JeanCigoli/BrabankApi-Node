const { validationResult } = require('express-validator');
const ValidatorUser = require('../validator/validUsers');

const autenticacao = (app) => {

    app.post('/registrar', ValidatorUser.validacoes() ,(req, res) => {

        const usuario = req.body;

        const erros = validationResult(req);

        if(!erros.isEmpty()){

            return res.status(400).json({
                status: false,
                ...erros
            });

        }

        UsuarioDao = app.src.model.Usuarios;       
  

        UsuarioDao.insert(usuario)
        .then(user => {

            res.status(201).json({
                status: true,
                payload: user
            })
        })
        .catch(erro => {

            console.log(erro);

            res.status(500).json({
                status: false,
                erro
            })
        })

    })

    app.post('/autenticar', (req, res) => {

    });

}

module.exports = autenticacao;