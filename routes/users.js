var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//create
router.get('/create', function(req, res, next) {
  res.render('user/create.ejs');
});


module.exports = router;
