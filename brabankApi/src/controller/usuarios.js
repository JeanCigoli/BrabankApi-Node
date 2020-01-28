const { validationResult } = require('express-validator');
const ValidatorUser = require('../validator/validUsers');

let UsuarioDao;

const usuarios = (app) => {

    app.get('/', (req, res) => {
        res.json({
            status: true,
            message: 'Servidor está rodando!'
        });
    });

    app.get('/usuarios', (req, res) => {

        UsuarioDao = app.src.model.Usuarios;

        UsuarioDao.listAll()
        .then(list => {
            res.json({
                status: true,
                payload: list
            });
        })
        .catch(erro => {
            res.status(500).json({
                status: false,
                erro
            })
        })
        
    });

    app.post('/usuarios', ValidatorUser.validacoes() ,(req, res) => {

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

    app.get('/usuarios/email/:email', (req, res) => {
    
        const { email } = req.params;

        UsuarioDao = app.src.model.Usuarios;    

        UsuarioDao.listByEmail(email)
            .then(user => {

                if(user){
                    res.json({
                        status: false,
                        user
                    })
                } else {
                    res.status(404).json({
                        status: false,
                        erro: "Usuário não encontrado"
                    })
                }

            })
            .catch(erro => {
            
                res.status(500).json({
                    status: false,
                    erro
                })
            }); 

    })

}

module.exports = usuarios;
