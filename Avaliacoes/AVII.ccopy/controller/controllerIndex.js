const atividades = require('../model/atividadeMongo.js')
exports.pagina_principal =  async function(req, res){
    contexto = {
        titulo_pagina:"Gerenciador de Atividades",
        atividades: await atividades.lista(),
    }
    res.render('index', contexto);
}
exports.ajuda = async function(req, res){
contexto = {
titulo_pagina: "Ajuda ao Usuário",
}
res.render('ajuda', contexto);
}
exports.prioridadeAlta = async function(req, res){
    const contexto = {
        titulo_pagina: "Atividades Prioridade Alta",
        atividades: await atividades.listaAlta()
    };

    res.render('prioridadeAlta', contexto);
}