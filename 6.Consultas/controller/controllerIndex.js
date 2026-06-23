// importação da classe que gerencia as notas no MongoDB
const notas = require("../model/notaMongo.js");

// Controller ÚNICO responsável pela tela principal (atende GET e POST)

// Controller ÚNICO responsável pela tela principal (atende GET e POST)
exports.tela_principal = async function (req, res) {
  var input = "";
  var resultSet;

  // Objeto para lembrar quais filtros foram marcados (Exercício 4)
  var filtrosMarcados = {
    lida: false,
    naolida: false,
    imp1: false,
    imp2: false,
    imp3: false,
    imp4: false,
    imp5: false,
  };

  // 1. Verifica se a requisição veio de algum formulário (POST)
  if (req.method === "POST") {
    // CASO A: Botão de Pesquisar
    if (req.body.btn_pesquisar !== undefined) {
      input = req.body.pesquisa || "";
      if (input.trim() === "") {
        resultSet = await notas.lista();
      } else {
        resultSet = await notas.query(input);
      }
    }

    // CASO B: Botão de Cancelar Pesquisa
    else if (req.body.btn_cancelar !== undefined) {
      input = "";
      resultSet = await notas.lista();
    }

    // CASO C: Botão de Aplicar Filtro (Offcanvas)
    else if (req.body.btn_filtrar !== undefined) {
      // 1. Captura quais checkboxes foram marcados
      filtrosMarcados.lida = req.body.filtro_lida !== undefined;
      filtrosMarcados.naolida = req.body.filtro_naolida !== undefined;
      filtrosMarcados.imp1 = req.body.filtro_imp1 !== undefined;
      filtrosMarcados.imp2 = req.body.filtro_imp2 !== undefined;
      filtrosMarcados.imp3 = req.body.filtro_imp3 !== undefined;
      filtrosMarcados.imp4 = req.body.filtro_imp4 !== undefined;
      filtrosMarcados.imp5 = req.body.filtro_imp5 !== undefined;

      // 2. Monta o objeto de consulta para o MongoDB baseado no que foi marcado
      let queryMongo = {};

      // Filtro de Status (Lida / Não Lida)
      if (filtrosMarcados.lida && !filtrosMarcados.naolida) {
        queryMongo.lida = true;
      } else if (!filtrosMarcados.lida && filtrosMarcados.naolida) {
        queryMongo.lida = false;
      }

      // Filtro de Importância (usando o operador $in do Mongo)
      let importancias = [];
      if (filtrosMarcados.imp1) importancias.push(1);
      if (filtrosMarcados.imp2) importancias.push(2);
      if (filtrosMarcados.imp3) importancias.push(3);
      if (filtrosMarcados.imp4) importancias.push(4);
      if (filtrosMarcados.imp5) importancias.push(5);

      if (importancias.length > 0) {
        queryMongo.importancia = { $in: importancias };
      }

      // 3. Executa a busca filtrada
      resultSet = await notas.filtrar(queryMongo);
    }
  }
  // 2. Se for um acesso normal via URL (GET)
  else {
    resultSet = await notas.lista();
  }

  // 3. Monta o contexto para renderizar a View
  var contexto = {
    titulo_pagina: "Gerenciador de Notas de Texto",
    notas: resultSet,
    vazio: (await notas.qtd()) == 0,
    campoEmpty: input.trim() === "",
    entrada: input,
    filtros: filtrosMarcados,
  };

  res.render("index", contexto);
};

exports.sobre = async function (req, res) {
  var contexto = {
    titulo_pagina: "Sobre o Aplicativo",
  };
  res.render("sobre", contexto);
};

exports.sobre = async function (req, res) {
  var contexto = {
    titulo_pagina: "Sobre o Aplicativo",
  };
  // renderiza o arquivo na dentro da pasta view
  res.render("sobre", contexto);
};
