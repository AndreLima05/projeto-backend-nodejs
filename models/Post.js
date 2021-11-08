const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../models/User");

const Post = connection.define('posts', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },description: {
        type: Sequelize.TEXT,
        allowNull: false
    },file: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

//Post.sync({force: true});
User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;