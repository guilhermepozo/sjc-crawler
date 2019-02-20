const mongoose = require('mongoose');
const config = require('config');
const logger = require('../log')


module.exports = function() {
  const host = config.get('host');
  const dbname = config.get('db_name');
  const username = config.get('db_username');
  const password = config.get('db_password');
  mongoose.connect( `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true`, { useNewUrlParser: true })
    .then(() => logger.info(`Mongoose Conectado em MongoDB...`));
}
