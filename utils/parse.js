const xregexp = require('xregexp');
const moment= require('moment');
const numeral = require('numeral');
require('numeral/locales');
numeral.locale('pt-br')
moment.locale('pt-br')

let parseDate = (text) => {
    const textDate = xregexp.exec(text, xregexp('(3[01]|[12][0-9]|0?[1-9]).*(Fevereiro|Janeiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro).*((?:19|20)\\d{2})', 'igs'))
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

exports.createBid = createBid;
exports.hasBids = hasBids;
exports.parseDate = parseDate;
exports.parseTime = parseTime;

