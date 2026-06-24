var express = require('express');
var router = express.Router();
var controllerAtividade = require('../controller/controllerAtividade.js')
router.get('/criar', controllerAtividade.criar_get);
router.post('/criar', controllerAtividade.criar_post);
router.get('/consultar/:id_atividade', controllerAtividade.consultar);
router.get('/excluir/:id_atividade', controllerAtividade.excluir);
router.get('/alterar/:id_atividade', controllerAtividade.alterar_get);
router.post('/alterar/:id_atividade', controllerAtividade.alterar_post);
module.exports = router;