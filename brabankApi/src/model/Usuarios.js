const conexao = require('../config/conexao-db');

class Usuarios {

    listAll(){

        return new Promise((resolve, reject) => {

            const sql = 'Select * from usuario';

            conexao.query(sql, (erro, result) => {

                if(erro){
                    reject("Erro ao consultar:", erro.message);
                    return
                }

                resolve(result);

            });

        })

    }

    insert(usuario){

        return new Promise((resolve, reject) => {

            const sql = 'INSERT INTO usuario SET ?';

            conexao.query(sql, usuario, (erro, retorno) => {

                erro ?
                    reject("Erro ao inserir: ", erro)
                :
                    resolve({id: retorno.insertId, ...usuario});

            })

        })

    }

    listByEmail(email){

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

    }

}

module.exports = new Usuarios();