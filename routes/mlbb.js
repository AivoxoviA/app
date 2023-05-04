var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let heroes = require(
    '../data/mlbb/heroes'
  ).filter(hero => hero.flag);
  console.log(heroes);
  res.render('mlbb/index', {
    title: 'AivoxoviA - MLBB'
    , heroes: heroes
  });
});

module.exports = router;