const atividades = require("../model/atividadeMongo.js");

var filtrosLigados = false;

var filtrosMarcados = {
  alta: false,
  media: false,
  baixa: false,
};
var allFiltersOn = false;
exports.pagina_principal = async function (req, res) {
  contexto = {
    titulo_pagina: "Gerenciador de Atividades",
    atividades: await atividades.lista(),
    todosOsFiltrosLigados: filtrosLigados,
  };
  res.render("index", contexto);
};

exports.pagina_principal_post = async function (req, res) {
  var atividadesList;

  var queryMongo = {};
  if (req.body.botao_cancelarFiltros !== undefined) {
    atividadesList = await atividades.lista();
    filtrosLigados = false;
  } else {
    if ((filtrosMarcados.alta = req.body.prioridadeAlta !== undefined)) {
      filtrosMarcados.alta = true;
    }
    if ((filtrosMarcados.media = req.body.prioridadeMedia !== undefined)) {
      filtrosMarcados.media = true;
    }
    if ((filtrosMarcados.baixa = req.body.prioridadeBaixa !== undefined)) {
      filtrosMarcados.baixa = true;
    }

    if (
      filtrosMarcados.alta &&
      filtrosMarcados.media &&
      filtrosMarcados.baixa
    ) {
      filtrosLigados = true;
    }

    const prioridades = [];

    if (filtrosMarcados.alta) prioridades.push("Alta");
    if (filtrosMarcados.media) prioridades.push("Média");
    if (filtrosMarcados.baixa) prioridades.push("Baixa");

    if (prioridades.length > 0) {
      queryMongo.prioridade = {
        $in: prioridades,
      };
    }
    atividadesList = await atividades.filtrar(queryMongo);
  }

  contexto = {
    titulo_pagina: "Gerenciador de Atividades",
    atividades: atividadesList,
    todosOsFiltrosLigados: filtrosLigados,
  };
  res.render("index", contexto);
};

exports.ajuda = async function (req, res) {
  contexto = {
    titulo_pagina: "Ajuda ao Usuário",
  };
  res.render("ajuda", contexto);
};
exports.prioridadeAlta = async function (req, res) {
  const contexto = {
    titulo_pagina: "Atividades Prioridade Alta",
    atividades: await atividades.listaAlta(),
  };

  res.render("prioridadeAlta", contexto);
};
