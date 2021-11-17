const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../models/User");

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
//ShareComment.sync({force: true});

module.exports = ShareComment;