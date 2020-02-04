const { validationResult } = require('express-validator');
const ValidatorUser = require('../../validator/validUsers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const auth = require('../../config/auth')

const gerarToken = (identity) => {
    return jwt.sign( identity, auth.secret, {
        expiresIn: 60
    })
}

const autenticacao = (app) => {

    app.post('/registrar', ValidatorUser.validacoes(), (req, res) => {

        const usuario = req.body;

        const erros = validationResult(req);

        if (!erros.isEmpty()) {

            return res.status(400).json({
                status: false,
                ...erros
            });

        }

        bcrypt.hash(usuario.senha, 10, (erro, hash) => {

            usuario.senha = hash;

            UsuarioDao = app.src.model.Usuarios;

            UsuarioDao.insert(usuario)
                .then(user => {

                    delete user.senha;

                    res.status(201).json({
                        status: true,
                        payload: {
                            user,
                            token: gerarToken({ id: user.id })
                        } 
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

    })

    app.post('/autenticar', async (req, res) => {

        const { email, senha } = req.body;

        UsuarioDao = app.src.model.Usuarios;

        const user = await UsuarioDao.listByEmail(email);

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

    });

    /* app.post('/autenticar',
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

   }); */
}

module.exports = autenticacao;