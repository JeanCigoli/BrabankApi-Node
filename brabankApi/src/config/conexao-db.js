const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: '52.207.209.77',
    port: 3306, 
    user: 'jeancigoli',
    password: 'Cigonaijean2@',
    database: 'db_brabank'
});

module.exports = conexao;
