const atividades = require('../model/atividadeMongo.js')

exports.criar_get = async function (req, res) {
    contexto = {
        titulo_pagina: "Criar Atividade"
    }
    res.render('criarAtividade', contexto);
}

exports.criar_post = async function (req, res) {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    var prioridade = req.body.prioridade

    await atividades.criar(titulo, descricao, prioridade);
    res.redirect('/');

}

exports.consultar = async function (req, res) {
    var id = req.params.id_atividade
    var atividade = await atividades.consultar(id);
    contexto = {
    titulo_pagina: "Consulta a Atividade",
    id: atividade.id,
    titulo: atividade.titulo,
    descricao: atividade.descricao,
    prioridade: atividade.prioridade,
    dataCriacao: atividade.dataCriacao.toLocaleDateString('pt-br'),
}
res.render('consultarAtividade', contexto);
}

exports.excluir = async function (req, res) {
   var id = req.params.id_atividade
await atividades.deletar(id);
res.redirect('/');
}
exports.alterar_get = async function(req, res){
var id = req.params.id_atividade
var atividade = await atividades.consultar(id)
contexto = {
titulo_pagina: "Alterar Atividade",
id: atividade._id,
titulo: atividade.titulo,
descricao: atividade.descricao,
baixa: atividade.prioridade == "Baixa",
media: atividade.prioridade == "Média",
alta: atividade.prioridade == "Alta",
    
dataCriacao: atividade.dataCriacao

}
res.render('alterarAtividade', contexto)
}
exports.alterar_post = async function(req, res){
var id = req.body.id
var titulo = req.body.titulo
var descricao = req.body.descricao
var prioridade = req.body.prioridade


await atividades.atualizar(id, titulo, descricao, prioridade)
res.redirect('/')
}