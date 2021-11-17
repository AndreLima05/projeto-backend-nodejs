const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../models/User");
const Post = require("./Post");

const ShareComment = connection.define('share_comments', {
    username:{
        type: Sequelize.STRING,
        allowNull: false,
    },comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

User.hasMany(ShareComment);
ShareComment.belongsTo(User);
Post.hasMany(ShareComment);
ShareComment.belongsTo(Post);
//ShareComment.sync({force: true});

module.exports = ShareComment;