const puppeteer = require('puppeteer');
const Bids = require('./models/bid')
const config = require('config')
const _ = require("lodash");
const logger = require('./utils/log')
const { hasBids, createBid } = require('./utils/parse');
const xregexp = require('xregexp');



let scraping = async() => {
    const urls = config.get('urls')
    let response = {};
    let dbData = []
    let browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {
        const data = []
        const url = urls[i]
        await page.goto(url);
        await page.waitForSelector('#ctl00_cphConteudo_lblResultado')
        const text = await page.$eval('#ctl00_cphConteudo_lblResultado', element => element.innerHTML);
        const category = await page.$eval('#ctl00_cphConteudo_lblModalidade', element => element.innerText);
        const department = await page.$eval('#ctl00_cphConteudo_lblSecretaria', element => element.innerText);
        const getSections = xregexp('(.*?)<br><br>', 'igs')
        const sections = xregexp.split(text, getSections).filter(element => element != '')

        if (!hasBids(text)) {
            _.setWith(response, `[${department}][${category}]`, [])
            continue;
        }

        sections.map((value, key) => {
            const bid = createBid(value, department, category);
            data.push(bid)
            dbData.push(bid)

        })
        _.setWith(response, `[${department}][${category}]`, data)
    }

    await Bids.insertMany(dbData, function(err, docs) {
        if (err) {
            logger.error(err)
        };
        logger.info('Dados Salvos no MongoDB');
    });


    await browser.close()
    return response;
}

module.exports = scraping;
