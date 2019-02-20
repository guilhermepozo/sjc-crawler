const mongoose = require('mongoose');


const licitacoesSchema = new mongoose.Schema({
    secretaria: {
        type: String,
        required: true
    },
    modalidade: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
    },

    status: {
        type: String,
        required: true
    },
    data: {
        type: Date
    },
    criadoEm: {
        type: Date,
        required: true,
        default: Date.now
    },

});

const Licitacao = mongoose.model('Licitacoes', licitacoesSchema);

module.exports =  Licitacao;
