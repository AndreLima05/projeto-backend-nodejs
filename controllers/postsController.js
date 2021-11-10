const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const Post = require("../models/Post");
const User = require("../models/User");

router.get("/home/posts", (req, res) => {
    Post.findAll().then(post => {
        res.render("admin/posts/index", {post: post});
    })
});

router.get("/new-post", adminAuth, (req, res) => {
    res.render("admin/posts/new");
});

router.post("/post/save", adminAuth, (req, res) => {

    var description = req.body.description;
    var file = req.body.file;
    var user = req.body.user;

    Post.create({
        description: description,
        file: file,
        userId: user
    }).then(() => {
        res.redirect("/home/posts");
    });
    
});

router.get("/post/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    Post.findByPk(id).then(post => {
        if(post != undefined) {
            Post.findAll().then(users => {
                res.render("admin/posts/edit", {post: post})
            });
        } else {
            res.redirect("/home/post")
        }
    }).catch(err => {
        res.redirect("/home/posts")
    });
});

router.post("/post/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var file = req.body.file;

    Post.update({title: title, description: description, file: file}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/home/posts");
    }).catch(err => {
        res.redirect("/home/posts");
    });
});

module.exports = router;