// importa o módulo http para processar requisições http
import * as http from "http";
//cria o servidor http
const servidor = http.createServer();
//configura a função que irá tratar as requisições http
servidor.on("request", (req, res) => {
  if (req.url === "/")
    //requisição página principal
    paginaPrincipal(req, res);
  else if (req.url === "/data")
    //requisição página "Sobre"
    data(req, res);
  else if (req.url === "/hora")
    //requisição página "Sobre"
    hora(req, res);
  else if (req.url === "/datahora")
    //requisição página "Sobre"
    horadata(req, res);
  else {
    //código 404 indica erro (recurso não localizado)
    res.writeHead(404, { "Content-Type": "text/plain" });
    //chama a função que finaliza a conexão, enviando a resposta
    res.end("Não foi possível acessar o caminho: " + req.url);
  }
});
//configura o endereço e porta do servidor e ativa o servidor
servidor.listen(8000, "127.0.0.1");
//exibe uma mensagem informado que o servidor está pronto
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");

function paginaPrincipal(req, res) {
  //prepara o cabeçalho da resposta
  res.writeHead(200, { "Content-Type": "text/html" });
  //chama a função que finaliza a conexão, enviando a resposta
  res.end(
    `<html>
      <head>
        <meta charset="UTF-8">
        <title>Aplicacao data e hora</title>
      </head>
      <body>
        <h1>Aplicacao Data/Hora</h1>
        <p>Aqui é possivel consultar  a data e/ou hora atual</p>
        <p><a href = "./data">Consultar  a data atual</a></p>
        <p><a href = "./hora">Consultar a hora atual</a></p>
        <p><a href = "./datahora">Consultar a data e hora atual</a></p>
      </body>
</html>`,
  );
}
function hora(req, res) {
  // obter hora atual
  const atual = new Date(Date.now());
  // retorna string com hora formatada para o formato brasileiro
  const hora_formatada = atual.toLocaleTimeString();
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(
    `<html>
      <head>
        <meta charset="UTF-8">
        <title>Hora atual</title>
      </head>
      <body>
        <p>Página para exibir hora  atual</p>
        <p>Hora atual : ${hora_formatada}</p>
        <a display:"inline" href = "./">Voltar</a>
       
      </body>
</html>`,
  );
}
function data(req, res) {
  const data_atual = new Date(Date.now());
  // retorna string com data formatada para o formato brasileiro
  const data_formatada = data_atual.toLocaleDateString();

  res.writeHead(200, { "Content-type": "text/html" });
  res.end(
    `<html>
      <head>
        <meta charset="UTF-8">
        <title>Data atual</title>
      </head>
      <body>
        <p>Página para exibir data  atual</p>
        <p>Data atual : ${data_formatada}</p>
        <a display:"inline" href = "./">Voltar</a>
      </body>
</html>`,
  );
}
function horadata(req, res) {
  // obter data atual
  const data_atual = new Date(Date.now());
  // retorna string com data formatada para o formato brasileiro
  const data_formatada = data_atual.toLocaleDateString();

  // obter hora atual
 // const hora_atual = new Date(Date.now());
  // retorna string com hora formatada para o formato brasileiro
  const hora_formatada = data_atual.toLocaleTimeString();

  res.writeHead(200, { "Content-type": "text/html" });
  res.end(
    `<html>
      <head>
        <meta charset="UTF-8">
        <title>Data e Hora atual</title>
      </head>
      <body>
        <p>Página para exibir data e hora atual</p>
        <p>Data e hora atual : ${data_formatada} - ${hora_formatada}</p>
        <a display:"inline" href = "./">Voltar</a>
      </body>
</html>`,
  );
}
