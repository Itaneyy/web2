// importa o módulo http para processar requisições http
import * as http from "http";
// importa o módulo url para tratamento das informações da URL
import * as url from "url";
//cria o servidor http
const servidor = http.createServer();
//configura a função que irá tratar as requisições http
servidor.on("request", (req, res) => {
  if (req.url.startsWith("/pedido"))
    //requisição página que irá processar o pedido, via formulário
    paginaPedido(req, res);
  else {
    paginaPrincipal(req, res);
  }
});
//configura o endereço e porta do servidor e ativa o servidor
servidor.listen(8000, "127.0.0.1");
//exibe uma mensagem informado que o servidor está pronto
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");

function paginaPrincipal(req, res) {
  //prepara o cabeçalho da resposta
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  //chama a função que finaliza a conexão, enviando a resposta
  res.end(
    `<html>
            <head>
                <meta charset="UTF-8">
                <title>Página Principal</title>
            </head>
            <body>
                <b>Informe os numeros abaixo para o aplicativo da poder calcular a media.</b>
                <form action="/pedido" method="get">
                    <p>
                        <label for = "in">Numero 1</label>
                        <input type  = "text"  name = "in" id = "in">
                    </p>
                    <p>
                        <label for = "in2">Numero 2</label>
                        <input type  = "text" id = "in2" name = "in2">
                    </p>
                    <p>
                        <label for = "in3">Numero 3</label>
                        <input type  = "text" id = "in3" name = "in3">
                    </p>
                    <button type="submit">Enviar</button>
                </form>
                </body>
        </html>`,
  );
}

function paginaFormulario(req, res) {
  //prepara o cabeçalho da resposta
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  //chama a função que finaliza a conexão, enviando a resposta
  res.end(
    `<html>
<head>
<meta charset="UTF-8" />
<title>Formulário</title>
</head>
<body>
<form action="/pedido" method="get">
<label for="nome">Nome</label>
<input type="text" name="nome" id="nome">
<label for="produto">Produto</label>
<input type="text" name="produto" id="produto">
<label for="qtd">Quantidade</label>
<input type="number" name="qtd" id="qtd">
<button type="submit">Enviar</button>
</form>
</body>
</html>`,
  );
}


// Página de resultado
function paginaPedido(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const n1 = Number(url.searchParams.get('n1'));
    const n2 = Number(url.searchParams.get('n2'));
    const n3 = Number(url.searchParams.get('n3'));

    const media = (n1 + n2 + n3) / 3;

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.end(`
<html>
    <head>
        <meta charset="UTF-8">
        <title>Resultado</title>
    </head>
    <body>

        <h1>Resultado da Operação</h1>

        <p>Média dos 3 números: ${media}</p>

        <br>
        <a href="/">Voltar</a>

    </body>
</html>
    `);
}

