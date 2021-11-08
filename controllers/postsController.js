const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const Post = require("../models/Post");

router.get("/new-post", adminAuth, (req, res) => {
    res.render("admin/posts/new")
});

router.post("/post/save", adminAuth, (req, res) => {

    var title = req.body.title;
    var description = req.body.description;
    var file = req.body.file;

    Post.create({
        title: title,
        description: description,
        file: file,
        userId: user
    }).then(() => {
        res.redirect("home/posts");
    });
    
});
