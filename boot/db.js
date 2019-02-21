const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/log')


module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db, { useNewUrlParser: true })
    .then(() => logger.info(`Mongoose Conectado em MongoDB...`));
}
