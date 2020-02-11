const { validationResult } = require('express-validator');

const usuarioDao = new (require('../model/Usuarios'));


module.exports = {
    async lista(req, res){

        try {

            const usuarios = await usuarioDao.listAll();

            if(!usuarios){
                return res.status(404).json({
                    status: false,
                    error: 'Não foi encontrado nenhum usuário'
                })
            }

            return res.json({
                status: true,
                payload: usuarios
            });
            
        } catch (error) {

            return res.status(500).json({
                status: false,
                error: error
            })   
        }
    },

    async insert(req, res){

        const usuario = req.body;

        const erros = validationResult(req);
    
        if(!erros.isEmpty()){

            return res.status(400).json({
                status: false,
                ...erros
            });

        }

        try {

            const retorno = await usuarioDao.insert(usuario);

            usuario.id = retorno.insertId;

            return res.status(201).json({
                status: true,
                payload: usuario
            })
            
        } catch (error) {

            return res.status(500).json({
                status: false,
                error: error
            })
            
        }

    },

}

// const usuarios = (app) => {

    // app.post('/usuarios', ValidatorUser.validacoes() ,(req, res) => {

    //     const usuario = req.body;

    //     const erros = validationResult(req);

    //     if(!erros.isEmpty()){

    //         return res.status(400).json({
    //             status: false,
    //             ...erros
    //         });

    //     }

    //     UsuarioDao = app.src.model.Usuarios;       

    //     UsuarioDao.insert(usuario)
    //     .then(user => {

    //         res.status(201).json({
    //             status: true,
    //             payload: user
    //         })
    //     })
    //     .catch(erro => {

    //         console.log(erro);

    //         res.status(500).json({
    //             status: false,
    //             erro
    //         })
    //     })

    // })

// }

// module.exports = usuarios;
