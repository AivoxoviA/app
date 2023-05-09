var express = require('express');
var router = express.Router();
const config = require('./../core/getConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: config.app.name
    , themeColor: '#aaa'
  });
});

module.exports = router;
