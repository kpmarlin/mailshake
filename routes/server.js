module.exports = function(db) {
  const apiRoutes = require('../api/index')(db);

  let express = require('express');
  let router = express.Router();

  router.post('/contact', apiRoutes.contact.contactProducers);
  router.get('/status', apiRoutes.status.checkStatus);
  
  return router;
}
