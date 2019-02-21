const config = require('config');

module.exports = function() {
  if (!config.get('db')) {
    throw new Error('FATAL ERROR: string de conexão do bando não definida.');
  }
}
