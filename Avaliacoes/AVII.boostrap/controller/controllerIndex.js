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
exports.tela_ajuda = async function (req, res) {
  var contexto = {
    titulo_pagina: "Ajuda ao usuário",
  };

  res.render("ajuda", contexto);
};
exports.tela_prioridade = async function (req, res) {
  var list = await banco.lista();
  const lista_prioriade_alta = [];

  for (var item of list) {
    if (item.prioridade == "Alta") {
      lista_prioriade_alta[lista_prioriade_alta.length] = item;
    }
  }

  var contexto = {
    titulo_pagina: "Ajuda ao usuário",
    lista: lista_prioriade_alta,
  };

  res.render("prioridadeAlta", contexto);
};
