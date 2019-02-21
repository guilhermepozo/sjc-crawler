const mongoose = require('mongoose');
const moment = require('moment');
const { hasBids, createBid, parseTime, parseDate } = require('../utils/parse');



describe('parse', () => {
    let text;
    let parsed;

    describe('parseTime', () => {
        it('Should find and return a valid Time with ":" separator ', () => {
            text = '14h35 texto exemplo.'
            parsed = parseTime(text);
            expect(parsed).toBeTruthy();

        });
        it('Should find and return a valid Time with ":" separator ', () => {
            text = '14:35 texto exemplo.'
            parsed = parseTime(text);
            expect(parsed).toBeTruthy();

        });
        it('Should return a null with "." separator ', () => {
            text = '14.35 texto exemplo.'
            parsed = parseTime(text);
            expect(parsed).toBeFalsy()

        });
        it('Should return a null with no time ', () => {
            text = 'texto exemplo.'
            parsed = parseTime(text);
            expect(parsed).toBeFalsy()

        });
    });
    describe('parseDate', () => {
        it('Should find and return a valid Date with "/" separator ', () => {
            text = '28/08/1994 texto exemplo.'
            parsed = parseDate(text);
            expect(parsed).toBeTruthy();
        });
        it('Should return a valid value with full text ', () => {
            text = '28 de agosto de 2018'
            parsed = parseDate(text);
            expect(parsed).toBeTruthy();
        });
        it('Should return a valid value with full text', () => {
            text = '28 agosto 2018'
            parsed = parseDate(text);
            expect(parsed).toBeTruthy();
        });
        it('Should return a valid value with full text  ', () => {
            text = '28, agosto, 2018'
            parsed = parseDate(text);
            expect(parsed).toBeTruthy();
        });
        it('Should return a null value with invalid full text  ', () => {
            text = '28 gosto 2018'
            parsed = parseDate(text);
            expect(parsed).toBeFalsy();
        });
    });
    describe('createBid', () => {
        it('Should return a valid bid', () => {
            text = `<b>PP 023/2019/SGAF</b><br>CONTRATAÇÃO DE EMPRESA PARA FORNECIMENTO DE REFEIÇÃO TIPO MARMITEX PARA O TIRO DE GUERRA.<br>Valor máximo: R$ 42.525,00<span class="p1">(401 KB)</span><br>Abertura: 27/02/2019 as 09h00.<br><a href="download.aspx?id=11389&amp;sec=1&amp;mod=3&amp;exc=N">Edital</a>`
            let example = {
                title: 'PP 023/2019/SGAF',
                description: 'CONTRATAÇÃO DE EMPRESA PARA FORNECIMENTO DE REFEIÇÃO TIPO MARMITEX PARA O TIRO DE GUERRA.',
                price: 42525,
                date: moment('27/02/2019 09:00', "DD/MM/YYYY HH:mm Z"),
                status: 'ABERTO',
                department: 'Brasil',
                category: '317'
            }
            let bid
            bid = createBid(text, example.department, example.category)
            expect(bid).toEqual(example)

        })
    });

});
