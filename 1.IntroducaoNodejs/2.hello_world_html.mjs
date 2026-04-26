// importa o módulo http para processar requisições http
import * as http from "http";
//cria o servidor http
const servidor = http.createServer();
//configura a função que irá tratar as requisições http
servidor.on("request", (req, res) => {
  //prepara o cabeçalho da resposta
  res.writeHead(200, { "Content-Type": "text/html" });
  var resposta = `<html>
                        <head>
                            <meta charset="UTF-8">
                            <title>Olá Mundo HTML</title>
                        </head>
                        <body>
                            <p>Olá Mundo HTML</p>
                        </body>
                    </html>`;
  // "escreve" ou envia a resposta
  res.write(resposta);
  // finaliza a conexão
  res.end();
});
//configura o endereço e porta do servidor e ativa o servidor
servidor.listen(8000, "127.0.0.1");
//exibe uma mensagem informado que o servidor está pronto
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");
