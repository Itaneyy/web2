// importação da classe que gerencia as notas na memória
const notas = require("../model/notaMemoria.js");
// cria e já exporta a função que será responsável pela criação de nota
exports.cria_get = async function (req, res) {
  contexto = {
    titulo_pagina: "Criação de Nota",
  };
  // renderiza o arquivo dentro da pasta view
  res.render("criaNota", contexto);
};
// cria e já exporta a função que será responsável pela criação de nota
exports.cria_post = async function (req, res) {
  // obtem as informações do formulário

  var chave = req.body.chave;
  var titulo = req.body.titulo;
  var texto = req.body.texto;
  var importancia = req.body.importancia;
  // cria a nota nota
  await notas.cria(chave, titulo, importancia, texto);
  // redireciona para a página principal
  res.redirect("/");
};
// cria e já exporta a função que será responsável pela consulta a nota
// cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  nota.lida = true;
  contexto = {
    titulo_pagina: "Consulta a Nota",
    chave: nota.chave,
    titulo: nota.titulo,
    importancia: nota.importancia,
    texto: nota.texto,
  };
  // renderiza o arquivo dentro da pasta view
  res.render("consultaNota", contexto);
};

// cria e já exporta a função que será responsável pela alteração de nota
// cria e já exporta a função que será responsável pela alteração de nota
exports.altera_get = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  contexto = {
    titulo_pagina: "Altera a Nota",
    chave: nota.chave,
    titulo: nota.titulo,
    texto: nota.texto,
    lida: nota.lida,
    importancia: nota.importancia,
  };
  // renderiza o arquivo dentro da pasta view
  res.render("alteraNota", contexto);
};

// cria e já exporta a função que será responsável pela criação de nota
// cria e já exporta a função que será responsável pela criação de nota
exports.altera_post = async function (req, res) {
  // obtem as informações do formulário
  var chave = req.body.chave;
  var titulo = req.body.titulo;
  var texto = req.body.texto;
  var importancia = req.body.importancia;
  var lida;
  if (req.body.status === "on") lida = true;
  else lida = false;
  // atualiza a nota com a chave e o status também
  await notas.atualiza(chave, titulo, importancia, texto, lida);
  // redireciona para a página principal
  res.redirect("/");
};

// cria e já exporta a função que será responsável pela exclusão da nota
exports.deleta = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  await notas.deleta(chave);
  // redireciona para a página principal
  res.redirect("/");
};
//cria e já exporta a função que será responsável pela alteração do status da nota para lida
exports.lida = async function (req, res) {
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  nota.lida = true;
  // redireciona para a página principal
  res.redirect("/");
};
//cria e já exporta a função que será responsável pela alteração do status da nota para não lida
exports.naolida = async function (req, res) {
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  nota.lida = false;
  // redireciona para a página principal
  res.redirect("/");
};

exports.confirmaExclusao_get = async function (req, res) {
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  res.render("confirmaExclusao", {
    chave: nota.chave,
    titulo: nota.titulo,
  });
};

exports.deleta_post = async function (req, res) {
  const chave = req.body.chave;
  await notas.deleta(chave); // Certifique-se que o modelo 'notas' está importado
  res.redirect("/");
};
