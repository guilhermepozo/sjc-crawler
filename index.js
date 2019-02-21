const winston = require('winston');
require('./boot/config')();
require('./boot/db')();
const mongoose = require('mongoose');
const scraping = require('./scraping');
const logger = require('./utils/log');

let app = scraping;

app().then(res => {
       // logger.info(JSON.stringify(res, null, 2))
        mongoose.disconnect()

    },
    error => {
        logger.error(error);
    })

module.exports = app;
