const Sequelize = require('sequelize');

const connection = new Sequelize ('social', 'root','', {
    host:'localhost',
    dialect: 'mysql',
});

module.exports = connection;
