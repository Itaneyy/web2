import *  as http from "http"

const server = http.createServer();

const data_atual = new Date(Date.now());
// retorna string com data formatada para o formato brasileiro
const data_formatada = data_atual.toLocaleDateString();

server.on("request", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    var resposta =
    `<html>
        <head>
            <meta charset="UTF-8">
            <title>Olá Mundo HTML</title>
        </head>
        <body>
            <h3>Pagina para exibir a data atualizada</h3>
            <p> Data atual : ${data_formatada} </p>
        </body>
        </html>`;

    res.end(resposta);
});
server.listen(8000, "127.0.0.1");
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");