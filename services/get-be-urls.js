const Constants = require('./constants');

function getBEURL({ req, key }) {
  const ctx = req.originalUrl.startsWith('/prod') ? 'PROD' : 'DEV';

  return Constants[ctx][key];
}

module.exports = getBEURL;
