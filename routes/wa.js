var express = require('express');
var router = express.Router();
const config = require('./../core/getConfig');

router.get('/', function(req, res, next) {
  const qr = req.app.get('whatsapp').qr;
  res.render('wa/index', {
    title: `${config.app.name} - whatsapp`,
    themeColor: '#aaa',
    qr: qr,
  });
});

module.exports = router;
