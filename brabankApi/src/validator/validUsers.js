const { check, body } = require('express-validator');
const UsuarioDao = require('../model/Usuarios');

class ValidUsers {

    static validacoes() {
        return [
            check('nome')
                .isLength({ min: 5, max: 100 })
                .withMessage("O nome deve ter entre 5 e 100 caracteres"),
        
            check('email')
                .isEmail()
                .withMessage("O e-mail não está correto"),
            
            check('cpf')
                .isNumeric()
                .withMessage("Cpf deve ser apenas números"),

            check('sexo')
                .isLength({ min: 1, max: 1 })
                .withMessage("O sexo deve conter apenas um caracter"),
            
            check('senha')
                .isLength({ min: 6, max: 15 })
                .withMessage("A senha deve ter entre 6 e 15 caracteres"),

            body('email').custom(email => {

                return UsuarioDao.listByEmail(email)
                .then(user => {

                    if(user){
                        return Promise.reject('E-mail já se encontra cadastrado');  
                    }

                })

            })

        ]
    }

}

module.exports = ValidUsers;

