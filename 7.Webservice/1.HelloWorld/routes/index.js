var express = require('express');
var router = express.Router();
var controllerHello =
require('../controller/helloworld.js')
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});
/* GET Hello World. */
router.get('/api/hello', controllerHello.hello);
router.post('/api/hello', controllerHello.hello_dados);


module.exports = router;