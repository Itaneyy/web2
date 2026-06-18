var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')
/* GET home page. */
router.get('/', controllerIndex.tela_principal);
/* GET página sobre */
router.get('/sobre', controllerIndex.sobre);

router.post('/',controllerIndex.tela_principal_post)
module.exports = router;