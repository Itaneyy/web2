// importação da classe que gerencia as notas no MongoDB
const Nota = require("../model/modelos.js");
const notas = require("../model/notaMongo.js");
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
  // obtém as informações do formulário
  var nota = req.body;
  //Tudo do BODY vem como texto !
  nota.importancia = Number(nota.importancia);
  // cria a nota nota
  await notas.cria(nota);
  // redireciona para a página principal
  res.redirect("/");
};

// cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  nota.lida = true;
  //atualização no banco de dados
  await notas.atualiza(nota);
  contexto = {
    titulo_pagina: "Consulta a Nota",
    nota: nota, //não preciso mais passar cada campo
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
    nota: nota,
  };
  // renderiza o arquivo dentro da pasta view
  res.render("alteraNota", contexto);
};

// cria e já exporta a função que será responsável pela criação de nota
exports.altera_post = async function (req, res) {
  // obtem as informações do formulário
  var nota = req.body;
  if (req.body.status === "on") {
    nota.lida = true;
    delete nota.status; //deleta este atributo para ele não ser armazenado em BD
  } else nota.lida = false;
  // atualiza a nota com a chave e o status também
  await notas.atualiza(nota);
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
  //atualização no banco de dados
  await notas.atualiza(nota);
  // redireciona para a página principal
  res.redirect("/");
};
//cria e já exporta a função que será responsável pela alteração do status da nota para não lida
exports.naolida = async function (req, res) {
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  nota.lida = false;
  //atualização no banco de dados
  await notas.atualiza(nota);
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
exports.criarNotasDeTeste = async function (req, res) {
  //s nota criada para teste
  var listaNotasPre = [
    {
      chave: "nota_1",
      titulo: "Olá Mundo, Notas",
      texto:
        "Esta é uma nota para testar as funcionalidades da aplicação de notas.",
      importancia: 1,
    },
    {
      chave: "nota_001",
      titulo: "Reunião com Cliente",
      importancia: 4,
      texto: "Discutir requisitos do novo sistema e alinhar prazos de entrega.",
    },
    {
      chave: "nota_002",
      titulo: "Lista de Compras",
      importancia: 3,
      texto: "Comprar arroz, feijão, café e produtos de limpeza.",
    },
    {
      chave: "nota_003",
      titulo: "Ideia de Projeto",
      importancia: 1,
      texto: "Criar um aplicativo para organização de tarefas pessoais.",
    },
    {
      chave: "nota_004",
      titulo: "Estudos",
      importancia: 5,
      texto: "Revisar conceitos de Node.js, Promises e async/await.",
    },
    {
      chave: "nota_005",
      titulo: "Backup",
      importancia: 2,
      texto: "Realizar backup completo do banco de dados até sexta-feira.",
    },
  ];

  for (item of listaNotasPre) {
    await notas.cria(item);
  }

  // var nota = {
  //   chave: "nota_1",
  //   titulo: "Olá Mundo, Notas",
  //   texto:
  //     "Esta é uma nota para testar as funcionalidades da aplicação de notas.",
  //   importancia: 1,
  // };
  // await notas.cria(nota);

  res.redirect("/");
};
