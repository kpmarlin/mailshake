module.exports = (db) => {
  const contact = require('./contact')(db);
  const status = require('./status')(db);

  return {
    contact: contact,
    status: status
  }
}