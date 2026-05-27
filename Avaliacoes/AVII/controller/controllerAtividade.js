// importação da classe que gerencia as banco na memória
const banco = require("../model/notaMemoria.js");
//Funcao para meu alteraAtividade.hbs funcionar

// cria e já exporta a função que será responsável pela criação de nota
exports.cria_get = async function (req, res) {
  contexto = {
    titulo_pagina: "Criação de Atividade",
  };
  // renderiza o arquivo dentro da pasta view
  res.render("criaAtividade", contexto);
};
// cria e já exporta a função que será responsável pela criação de nota
exports.cria_post = async function (req, res) {
  // obtem as informações do formulário

  var titulo = req.body.titulo;
  var desc = req.body.desc;
  var prioridade = req.body.prioridade;
  // cria a nota nota
  await banco.cria(titulo, desc, prioridade);
  // redireciona para a página principal
  res.redirect("/");
};
// cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await banco.consulta(chave);
  contexto = {
    titulo_pagina: "Consulta a Atividade",
    titulo: nota.titulo,
    desc: nota.descricao,
    prioridade: nota.prioridade,
    dataDeCriacao: nota.dataCriacao.toLocaleDateString("pt-BR"),
    chave: chave,
  };
  // renderiza o arquivo dentro da pasta view
  res.render("consultaAtividade", contexto);
};

// cria e já exporta a função que será responsável pela exclusão da nota
exports.deleta = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  await banco.deleta(chave);
  // redireciona para a página principal
  res.redirect("/");
};

exports.altera_get = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await banco.consulta(chave);
  contexto = {
    titulo_pagina: "Altera a Nota",
    chave: chave,
    tittle: nota.titulo,
    texto: nota.descricao,
    
  };
  // renderiza o arquivo dentro da pasta view
  res.render("alteraAtividade", contexto);
};
// 


exports.altera_post = async function (req, res) {
  // obtem as informações do formulário
  var chave = req.body.chave;
  var titulo = req.body.titulo;
  var texto = req.body.texto;
  var prioridade = req.body.prioridade;

  await banco.atualiza(chave, titulo, texto,prioridade);
  
  res.redirect("/");
};
