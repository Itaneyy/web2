// TODO : TERMINAR

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
  else if (req.url.startsWith("/resposta"))
    //requisição página "resposta"
    paginaresposta(req, res);
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

function paginaresposta(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const n1 = parseFloat(url.searchParams.get("v1"));
  const n2 = parseFloat(url.searchParams.get("v2"));
  const n3 = parseFloat(url.searchParams.get("v3"));
  const n4 = parseFloat(url.searchParams.get("v4"));

  const media = (n1 + n2 + n3 + n4) / 4;

  let html, img;

  if (media >= 6.0) {
    img =
      "https://colposcopiapr.org/site/wp-content/uploads/2023/10/Aprovado.jpg";
    html = `
    <html>
      <body>
        <h1>Resultado</h1>
        <p>Parabéns, você foi aprovado!</p>
        <img src="${img}" alt="img" width="30%">
      </body>
    </html>`;
  } else {
    img =
      "https://edmeneguel.wordpress.com/wp-content/uploads/2012/06/reprovado.jpg";
    html = `
    <html>
      <body>
      <h1>Resultado</h1>
      <p>
        <b>
           Infelizmente não foi dessa vez :(
            </b>
            </p>
     
        <img src="${img}" alt="img" width="30%">
      </body>
    </html>`;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}
