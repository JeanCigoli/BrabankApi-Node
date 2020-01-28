const http = require('http');

// Criando um server 
const server = http.createServer((req, res) => {

    res.end(
        "<h1>Atendendo a requisição</h1>"
    )

});

server.listen(3333, () => {
    console.log("estou na porta 3333");
})