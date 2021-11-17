const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const ShareComment = require("../models/ShareComment");

router.post("/comment/save", adminAuth, (req, res) => {

    var comment = req.body.comment;
    var postId = req.body.id;

    ShareComment.create({
        comment,
        userId: req.session.user.id,
        username: req.session.user.username,
        postId
    }).then(() => {
        res.redirect("/home/posts");
    });
    
});

module.exports = router;