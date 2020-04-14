const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: '',
    port: 3306, 
    user: '',
    password: '',
    database: 'db_brabank'
});

module.exports = conexao;
