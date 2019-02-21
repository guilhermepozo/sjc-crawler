const puppeteer = require('puppeteer');
const xregexp = require('xregexp');
const Bids = require('./models/bid')
const config = require('config')
const numeral = require('numeral');
require('numeral/locales');
const _ = require("lodash");
const moment = require('moment')
numeral.locale('pt-br')
moment.locale('pt-br')
const logger = require('./utils/log')

const urls = config.get('urls')

let parseDate = (text) => {
    const textDate = xregexp.exec(text, xregexp('(3[01]|[12][0-9]|0?[1-9]) *de *(Fevereiro|Janeiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro) *de *((?:19|20)\\d{2})', 'igs'))
    const numberDate = xregexp.exec(text, xregexp('(3[01]|[12][0-9]|0?[1-9])\\/(1[012]|0?[1-9])\\/((?:19|20)\\d{2})', 'igs'))
    return numberDate ? numberDate[0] : textDate ? moment(`${textDate[1]}/${textDate[2]}/${textDate[3]}`, 'DD/MMMM/YYYY').format('DD/MM/YYYY') : null
}

let parseTime = (text) => {
    const time = xregexp.exec(text, xregexp('(\\d{1,2}(h|:)\\d{2})', 'igs'))
    return time ? time[1].replace('h', ":") : null
}

let hasBids = (element) => {
    return element.search('Nenhuma licitação nessa modalidade.') ? true : false
}

let createBid = (section, department, category) => {
    let date = moment(parseDate(section) + ' ' + parseTime(section), "DD/MM/YYYY HH:mm Z")
    let status = xregexp('SUSPENS', 'igs').test(section) ? "SUSPENSO" : xregexp('PRORROGAD ', 'igs').test(section) ? "PRORROGADO" : "ABERTO"
    let price = numeral(xregexp.exec(section, xregexp("R\\$.*?\\,\\d{2}", 'igs'))[0].replace('R$', '')).value()
    let description = xregexp.exec(section, xregexp('<br>(.*?)<br>', 'igs'))[1]
    let title = xregexp.exec(section, xregexp('<b>(.*?)<\/b>', 'igs'))[1]
    const bid = {
        title,
        description,
        price,
        status,
        date,
        department,
        category
    }
    return bid;
}

let scraping = async() => {
    let response = {};
    let dbData = []
    let browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {

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
            dbData.push(bid)
             _.setWith(response, `[${department}][${category}]`, bid)

        })
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
