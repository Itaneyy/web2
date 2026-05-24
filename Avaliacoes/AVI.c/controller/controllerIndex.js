// importação da classe que gerencia as notas na memória
const banco = require("../model/notaMemoria.js");
// cria e já exporta a função que será responsável pela tela principal

exports.tela_principal = async function (req, res) {
  // Busca a lista de atividades do banco
  var notas = await banco.lista();

  var contexto = {
    titulo_pagina: "Gerenciador de Atividades",
    lista: notas,
  };

  // renderiza o arquivo index.hbs dentro da pasta view
  res.render("index", contexto);
};
