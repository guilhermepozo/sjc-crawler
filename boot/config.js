const config = require('config');

module.exports = function() {
  if (!config.get('db_password')) {
    throw new Error('FATAL ERROR: senha do MongoDB não definida.');
  }
}