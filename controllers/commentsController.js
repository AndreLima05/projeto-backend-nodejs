const express = require("express");
const router = express.Router();
const { render } = require("ejs");
const adminAuth = require("../middleware/adminAuth");

const User = require("../models/User");
const ShareComment = require("../models/ShareComment");

router.post("/comment/save", adminAuth, (req, res) => {

    var comment = req.body.comment;

    ShareComment.create({
        comment: comment,
        userId: req.session.user.id,
        username: req.session.user.username
    }).then(() => {
        res.redirect("/home/posts");
    });
    
});

module.exports = router;