// importação da classe que gerencia as notas no MongoDB
const notas = require("../model/notaMongo.js");
// cria e já exporta a função que será responsável pela tela principal
exports.tela_principal = async function (req, res) {
  //nota criada para teste
  contexto = {
    titulo_pagina: "Gerenciador de Notas de Texto",
    notas: await notas.lista(),
    vazio: (await notas.qtd()) == 0,
  };

  // renderiza o arquivo index.hbs, dentro da pasta view
  res.render("index", contexto);
};
exports.sobre = async function (req, res) {
  contexto = {
    titulo_pagina: "Sobre o Aplicativo",
  };
  // renderiza o arquivo na dentro da pasta view
  res.render("sobre", contexto);
};
exports.tela_principal_post = async function (req, res) {
  console.log("cheguei");
  var input = req.body.pesquisa.value;
  var resultSet = await notas.query({ texto: input });
  var qtd = resultSet.count({});

  var contexto = {
    titulo_pagina: "Gerenciador de Notas de Texto",
    notas: resultSet,
    vazio: qtd == 0,
  };
  res.render("/",contexto)
};
