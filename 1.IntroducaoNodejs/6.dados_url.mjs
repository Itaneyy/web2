// importa o módulo http para processar requisições http
import * as http from "http";
// importa o módulo url para tratamento das informações da URL
import * as url from "url";
//cria o servidor http
const servidor = http.createServer();
servidor.on("request", (req, res) => {
  //prepara o cabeçalho da resposta
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  //processando os dados que foram enviados via método GET
  let parametros = new url.URLSearchParams(req.url);
  var nome = parametros.get("/?nome");
  var produto = parametros.get("produto");
  var qtd = parametros.get("qtd");
  if (parseInt(qtd) < 0)
    res.end(
      nome +
        ", você informou uma quantidade de produtos incorreta, favor fazer a requisição novamente.",
    );
  else
    res.end(
      nome +
        ", o seu pedido para " +
        qtd +
        " item(ns) do produto '" +
        produto +
        "' será processado.",
    );
});
servidor.listen(8000, "127.0.0.1");
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");
