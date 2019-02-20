const puppeteer = require('puppeteer');
const xregexp = require('xregexp');
const Licitacao = require('./models/licitacoes')
const numeral = require('numeral');
require('numeral/locales');
const _ = require("lodash");
const moment = require('moment')
numeral.locale('pt-br')
moment.locale('pt-br')
const logger = require('./log')

let parseData = (texto) => {
    const dataTexto = xregexp.exec(texto, xregexp('(3[01]|[12][0-9]|0?[1-9]) *de *(Fevereiro|Janeiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro) *de *((?:19|20)\\d{2})', 'igs'))
    const dataNumero = xregexp.exec(texto, xregexp('(3[01]|[12][0-9]|0?[1-9])\\/(1[012]|0?[1-9])\\/((?:19|20)\\d{2})', 'igs'))

    return dataNumero ? dataNumero[0] : dataTexto ? moment(`${dataTexto[1]}/${dataTexto[2]}/${dataTexto[3]}`, 'DD/MMMM/YYYY').format('DD/MM/YYYY') : null
}
let parseHora = (texto) => {
    return xregexp.exec(texto, xregexp('(\\d{1,2}(h|:)\\d{2})', 'igs')) ? xregexp.exec(texto, xregexp('(\\d{1,2}(h|:)\\d{2})', 'igs'))[1].replace('h', ":") : null
}

let scraping = async() => {


    let urls = [
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=1',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=2',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=3',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=4',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=5',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=6',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=7',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=8',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=9',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=10',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=11',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=12',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=13',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=1&sit=1&mod=14',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=1',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=2',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=3',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=4',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=5',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=6',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=7',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=8',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=9',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=10',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=11',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=12',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=13',
        'https://servicos.sjc.sp.gov.br/sa/licitacoes/detalhe.aspx?sec=2&sit=1&mod=14'

    ]
try{
    let browser = await puppeteer.launch({
        headless: true
    })
}
catch(e){
    logger.error(e)
}
    let scraping = {};
    let banco = [];


    for (let i = 0; i < urls.length; i++) {
        const page = await browser.newPage();

        await page.goto(urls[i]);
        await page.waitForSelector('#ctl00_cphConteudo_lblResultado')


        const resultado = await page.$eval('#ctl00_cphConteudo_lblResultado', e => e.innerHTML);
        const modalidade = await page.$eval('#ctl00_cphConteudo_lblModalidade', e => e.innerText);
        const secretaria = await page.$eval('#ctl00_cphConteudo_lblSecretaria', e => e.innerText);

        if (resultado.search('Nenhuma licitação nessa modalidade.') != -1) {
            _.setWith(scraping, `[${secretaria}][${modalidade}]`, [])
            continue;
        }

        let item = xregexp.split(resultado, xregexp('(.*?)<br><br>', 'igs')).filter(el => el != '')
        let dados = []
        item.map((chave, valor) => {
            const licitacao = {
                titulo: xregexp.exec(chave, xregexp('<b>(.*?)<\/b>', 'igs'))[1],
                descricao: xregexp.exec(chave, xregexp('<br>(.*?)<br>', 'igs'))[1],
                valor: numeral(xregexp.exec(chave, xregexp("R\\$.*?\\,\\d{2}", 'igs'))[0].replace('R$', '')).value(),
                prazo: xregexp('SUSPENS', 'igs').test(chave) ? { status: "SUSPENSO" } : xregexp('PRORROGADA ', 'igs').test(chave) ? { status: "PRORROGADO" } : {
                    status: "ABERTO",
                    data: moment(parseData(chave) + ' ' + parseHora(chave), "DD/MM/YYYY HH:mm Z"),
                }
            }
            banco.push(_.pickBy({
                secretaria: secretaria,
                modalidade: modalidade,
                titulo: licitacao.titulo,
                descricao: licitacao.descricao,
                valor: licitacao.valor,
                status: licitacao.prazo.status,
                data: licitacao.prazo.data

            }, _.identity))

            dados.push(licitacao)
        })
        _.setWith(scraping, `[${secretaria}][${modalidade}]`, dados)

    }




    await Licitacao.insertMany(banco, function(err, docs) {
        if (err) { logger.error(err) };

        logger.info('Dados Salvos no MongoDB');
    });
    await browser.close();
    return scraping;
}

module.exports = scraping;
