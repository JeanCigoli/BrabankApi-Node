const conexao = require('../../config/conexao-db');

module.exports = (sql, params) => {

    return new Promise((resolve, reject) => {

        conexao.query(sql, params || '', (erro, retorno) => {

            erro ?
                reject(erro)
            :
                resolve(retorno);

        })

    })

}