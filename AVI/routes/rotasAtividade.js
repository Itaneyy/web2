var express = require("express");
var router = express.Router();
var controllerAtividade = require("../controller/controllerAtividade.js");
/* GET Cria Nota. */
router.get("/cria", controllerAtividade.cria_get);

/* POST Cria Nota. */
router.post("/cria", controllerAtividade.cria_post);

/* GET Consulta Nota. */
router.get("/consulta/:chave_nota", controllerAtividade.consulta);

/* GET Exclui Nota. */
router.get("/deleta/:chave_nota", controllerAtividade.deleta);


module.exports = router;
