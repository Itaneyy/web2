// importa o módulo http para processar requisições http
import * as http from 'http'
//cria o servidor http
const servidor = http.createServer();
//configura a função que irá tratar as requisições http
servidor.on('request', (req, res) => {
//prepara o cabeçalho da resposta
res.writeHead(200, { 'Content-Type': 'text/plain' });
// "escreve" ou envia dados
res.write("Olá Mundo!\n");
// finaliza a conexão
res.end()
});
//configura o endereço e porta do servidor e ativa o servidor
servidor.listen(8000, '127.0.0.1');
//exibe uma mensagem informado que o servidor está pronto
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");