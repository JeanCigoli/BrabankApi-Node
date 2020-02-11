const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const usuarioDao = new (require('../../model/Usuarios'));
const auth = require('../../../config/auth')

const gerarToken = (identity) => {
    return jwt.sign(identity, auth.secret, {
        expiresIn: 60
    })
}

module.exports = {

    async registrar(req, res) {

        const usuario = req.body;

        const erros = validationResult(req);

        if (!erros.isEmpty()) {

            return res.status(400).json({
                status: false,
                ...erros
            });
        }

        try {

            const hash = await bcrypt.hash(usuario.senha, 10);

            usuario.senha = hash;

            const result = await usuarioDao.insert(usuario);

            usuario.id = result.insertId;

            return res.status(201).json({
                status: true,
                payload: {
                    usuario,
                    token: gerarToken({ id: usuario.id })
                }
            })

        } catch (error) {

            return res.status(500).json({
                status: false,
                error
            })
        }
    },

    async autenticar(req, res) {

        const { email, senha } = req.body;

        try {

            let user = await usuarioDao.listByEmail(email);

            user = user[0];

            if (!user) {
                return res.status(401).json({
                    status: false,
                    erro: 'Usuário e/ou senha inválidos'
                })
            }

            if (!await bcrypt.compare(senha, user.senha)) {
                return res.status(401).json({
                    status: false,
                    erro: 'Usuário e/ou senha inválidos'
                })
            }

            delete user.senha;

            return res.json({
                status: true,
                payload: {
                    user,
                    token: gerarToken({ id: user.id })
                }
            })

        } catch (error) {

            return res.status(500).json({
                status: false,
                error
            })

        }
    }
}

/*const autenticacao = (app) => {

    app.post('/autenticar',
    (req, res) => {

       const { email, senha } = req.body;

       UsuarioDao = app.src.model.Usuarios;

       UsuarioDao.listByEmail(email)
       .then(user => {

           if(!user){
               return res.status(401).json({
                   status: false,
                   erro: 'Usuário e/ou senha inválidos'
               })
           }

           bcrypt.compare(senha, user.senha, (erro, success) => {

               if(!success){
                   return res.status(401).json({
                       status: false,
                       erro: 'Usuário e/ou senha inválidos'
                   })
               }

               const token = jwt.sign({ id: user.id }, auth.secret, {
                   expiresIn: 60
               })

               delete user.senha;

               return res.json({
                   status: true,
                   payload: {
                       user,
                       token: token
                   }

               })
           })

       })
       .catch(erro => {
           console.log(erro)
       })

   });
}*/