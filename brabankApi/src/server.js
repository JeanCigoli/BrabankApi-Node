const express = require('express');
const auth = require('./routes/authRoutes');
const categorias = require('./routes/categoriaRoutes');
const authMid = require('./middlewares/auth');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', auth);

app.use(authMid);

app.use('/categorias', categorias);

module.exports = app;

