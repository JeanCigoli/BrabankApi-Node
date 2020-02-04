const auth = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    app.get('/categorias', (req, res) => {

        res.json({
            status: true,
            payload: 'Estou aqui!'
        })

    })

}