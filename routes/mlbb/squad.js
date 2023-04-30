var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mlbb/squad', { title: 'AivoxoviA - MLBB Squad' });
});

module.exports = router;