import * as http from "http";
const servidor = http.createServer();
var contagem_visitas = 0;
servidor.on("request", (req, res) => {
  //prepara o cabeçalho da resposta
  res.writeHead(200, { "Content-Type": "text/html" });
  contagem_visitas++;
  var resposta =
    `<html>
        <head>
            <meta charset="UTF-8">
            <title>Olá Mundo HTML</title>
        </head>
        <body>
            <h3>Olá Mundo HTML com contado  r de visitas</h3>
            <p>Este site já foi visitado: ` +
            contagem_visitas +
            ` vez(es)</p>
        </body>
        </html>`;
  res.end(resposta);
});
servidor.listen(8000, "127.0.0.1");
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");
