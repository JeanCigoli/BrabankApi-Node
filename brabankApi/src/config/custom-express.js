const express = require('express');
const consign = require('consign');

// Chamando o express
const app = express();

const CustomExpress = () => {

    app.use(express.json());

    // Incluindo todas as controller dentro de app
    consign()
    .include('./src/controller')
    .include('./src/model')
    .into(app);

    return app;
}

// exportando o function ja inicializada;
module.exports = CustomExpress();
