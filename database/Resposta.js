const Sequilize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define("resposta",{
    corpo:{
        type: Sequilize.TEXT,
        allowNull: false
    },

    perguntaID:{
        type: Sequilize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() =>{});

module.exports = Resposta;