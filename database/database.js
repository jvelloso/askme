const Sequilize = require("sequelize");

// configuração p conectar o projeto com o banco de dados mysql
const connection = new Sequilize('ajudadp', 'root', 'jessica19',{
    host: 'localhost',
    dialect: 'mysql'
});

//exportando a conexão criada
module.exports = connection;