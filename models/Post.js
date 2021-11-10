const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../models/User");

const Post = connection.define('posts', {
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },file: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

User.hasMany(Post);
Post.belongsTo(User);
//Post.sync({force: true});

module.exports = Post;