var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')
/* GET home page. */
router.get('/', controllerIndex.tela_principal);
router.get('/ajuda', controllerIndex.tela_ajuda);
router.get('/prioridadeAlta', controllerIndex.tela_prioridade);
module.exports = router;