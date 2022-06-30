const Sequilize = require('sequelize');
const connection = require('./database');

//criação da tabela em formato JS no banco de dados usando o sequelize.
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequilize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequilize.TEXT,
        allowNull: false
    }
});

//enviando a model para a criação da tabela no banco de dados
Pergunta.sync({force: false}).then(() =>{});

module.exports = Pergunta;