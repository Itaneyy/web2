var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')

router.get('/', controllerIndex.pagina_principal);
router.get('/ajuda', controllerIndex.ajuda);
router.get('/prioridadeAlta', controllerIndex.prioridadeAlta);
module.exports = router;
