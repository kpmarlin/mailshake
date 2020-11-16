let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/status', async function(req, res, next) {
  res.render('status');
});

module.exports = router;
