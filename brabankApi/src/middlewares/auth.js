const jwt = require('jsonwebtoken')
const auth = require('../config/auth')

module.exports = (app) => {

    app.use( async (req, res, next) => {

        const authHeader = req.headers.authorization;
    
        // Verifica se existe um authorization
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                erro: 'Token não informado.'
            })
        }
    
        const parts = authHeader.split(' ');
    
        // Verifica se o parametro está correto 
        if (parts.length !== 2) {
            return res.status(401).json({
                status: false,
                erro: 'Erro no token, enviado incorretamente'
            })
        }
    
        const [bearer, token] = parts;
    
        // Verifica se o bearer está formatado
        if (!/^Bearer$/i.test(bearer)) {
            return res.status(401).json({
                status: false,
                erro: 'Token mal formatado'
            })
        }
    
        try {
    
            const decoded = await jwt.verify(token, auth.secret);
    
            req.userId = decoded.id;
    
            next();
    
        } catch (error) {
    
            return res.status(401).json({
                status: false,
                erro: 'Token inválido'
            })
    
        }
    
    
    })

}