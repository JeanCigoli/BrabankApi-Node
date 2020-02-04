const express = require('express');
const consign = require('consign');

// Chamando o express
const app = express();

const CustomExpress = () => {

    app.use(express.json());

    consign()
    .include('./src/controller/public')
    .then('./src/middlewares')
    .then('./src/controller')
    .then('./src/model')
    .into(app)

    return app;
}

// exportando o function ja inicializada;
module.exports = CustomExpress();
