var express = require("express");
var router = express.Router();
var controllerAtividade = require("../controller/controllerAtividade.js");
/* GET Cria Atividade. */
router.get("/cria", controllerAtividade.cria_get);

/* POST Cria Atividade. */
router.post("/cria", controllerAtividade.cria_post);

/* GET Consulta Atividade. */
router.get("/consulta/:chave_nota", controllerAtividade.consulta);


router.get("/altera/:chave_nota", controllerAtividade.altera_get);


router.post("/altera/:chave_nota", controllerAtividade.altera_post);

/* GET Exclui Atividade. */
router.get("/deleta/:chave_nota", controllerAtividade.deleta);


module.exports = router;
