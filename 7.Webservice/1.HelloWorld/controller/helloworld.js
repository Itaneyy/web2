exports.hello = function (req, res) {
  var json = { mensagem: "Hello World!!!" };
  res.json(json);
};
exports.hello_dados = (req, res) => {
  // o body-parser inclui os dados recebidos no objeto "body" da requisição
  var msg_adicional = req.body.msg_adicional;
  var nome_usuario = req.body.nome;
  var valor = req.body.valor;
  var json = {
    mensagem: "Hello World Recebendo Dados !!!",
    adicional: msg_adicional,
    nome: nome_usuario,
    valor: valor,
  };
  res.json(json);
};
