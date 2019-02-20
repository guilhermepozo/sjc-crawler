const winston = require('winston');
require('./boot/config')();
require('./boot/db')();
const mongoose = require('mongoose');
const scraping = require('./scraping');
const logger = require('./log');


scraping().then(res => {
        mongoose.disconnect()
    },
    error => {
        logger.error(error);
    })
