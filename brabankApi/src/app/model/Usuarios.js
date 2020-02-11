const baseQuery = require('./baseQuery');

class Usuarios {

    listAll(){

        return baseQuery('Select * from usuario');

    }

    insert(usuario){

        return baseQuery('INSERT INTO usuario SET ?', usuario);

    }

    listByEmail(email){

        return baseQuery('SELECT * FROM usuario WHERE email = ?', email);

    }

    /*listByEmail(email){

        return new Promise((resolve, reject) => {

            const sql = 'SELECT * FROM usuario WHERE email = ?';

            conexao.query(sql, email, (erro, retorno) => {

                if(erro){
                    reject("Erro ao buscar o email: " + erro)
                }else{

                    const usuario = retorno[0];

                    resolve(usuario);
                   
                }

            })

        })

    }*/

}

module.exports = Usuarios;