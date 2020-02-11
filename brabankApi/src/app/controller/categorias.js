const { validationResult } = require('express-validator');
const categoriasDao = new (require('../model/Categorias'));

module.exports = {

    async listCategorias(req, res) {

        try {

            const categorias = await categoriasDao.listAll();

            if (categorias.length === 0) {
                return res.status(404).json({
                    status: false,
                    error: 'Não foi encontrada nenhuma categoria!'
                })
            }

            return res.json({
                status: true,
                payload: categorias
            })

        } catch (error) {

            return res.status(500).json({
                status: false,
                error
            })

        }

    },

    async insert(req, res){

        const categoria = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(404).json({
                status: false,
                errors
            })
        }

        try {
            
            const result = await categoriasDao.insert(categoria);

            categoria.id = result.insertId;

            return res.status(201).json({
                status: true,
                payload: categoria
            })

        } catch (error) {

            return res.status(500).json({
                status: false,
                error
            })

        }

    }, 

    async listById(req, res){

        const { id } = req.params;

        try {
            
            const categoria = await categoriasDao.listById(id);

            if (!categoria) {
                return res.status(404).json({
                    status: false,
                    error: 'Não foi encontrada nenhuma categoria!'
                })
            }

            return res.json({
                status: true,
                payload: categoria
            })

        } catch (error) {

            return res.status(500).json({
                status: false,
                error
            })

        }

    }


    // app.get('/categorias', (req, res) => {
    //     res.json({
    //         status: true,
    //         payload: 'Estou aqui!'
    //     })
    // })
}