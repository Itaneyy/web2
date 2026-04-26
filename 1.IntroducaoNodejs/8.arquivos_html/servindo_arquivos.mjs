// importa o módulo http para processar requisições http
import * as http from "http";
// importa o mõdulo para manipulação de arquivos
import * as fs from "fs";
//cria o servidor http
const servidor = http.createServer();
//configura a função que irá tratar as requisições http
servidor.on("request", (req, res) => {
  if (req.url === "/")
    //requisição página principal
    paginaPrincipal(req, res);
  else if (req.url === "/sobre")
    //requisição página "Sobre"
    paginaSobre(req, res);
  else {
    //código 404 indica erro (recurso não localizado)
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
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
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  //chama a função que finaliza a conexão, enviando a resposta
  try {
    const html = fs.readFileSync("./html/index.html");
    res.write(html);
    res.end();
  } catch (erro) {
    console.error("Houve o seguinte erro ao tentar acessar o arquivo: " + erro);
  }
}

function paginaSobre(req, res) {
  //prepara o cabeçalho da resposta
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  //chama a função que finaliza a conexão, enviando a resposta
  try {
    const html = fs.readFileSync("./html/sobre.html");
    res.write(html);
    res.end();
  } catch (erro) {
    console.error("Houve o seguinte erro ao tentar acessar o arquivo: " + erro);
  }
}
