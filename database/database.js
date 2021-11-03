const Sequelize = require('sequelize');

const connection = new Sequelize ('social', 'root','', {
    host:'localhost',
    dialect: 'mysql',
    timezone: "+01:00"
});

module.exports = connection;
