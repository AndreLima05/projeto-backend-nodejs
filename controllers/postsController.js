const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const User = require("../models/User");
const ShareComment = require("../models/ShareComment");
const Post = require("../models/Post");


router.get("/home/posts", adminAuth, (req, res) => {
    const id = req.session.user.id
    Post.findAll({ 
        include: { model: ShareComment }
     }).then(post => {
        const mappedPosts = post.map(item => {
            console.log(item)
            return {
                ...item, 
                isFromUser: id === item.userId
            }
        })
        res.render("admin/posts/index", {posts: mappedPosts});
    })
});

router.post("/post/save", adminAuth, (req, res) => {

    var description = req.body.description;
    var file = req.body.file;
/*     console.log(req.body);
    console.log(req.session.user); */

    Post.create({
        description: description,
        file: file,
        userId: req.session.user.id,
        username: req.session.user.username
    }).then(() => {
        res.redirect("/home/posts");
    });
    
});

router.get("/post/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    Post.findByPk(id).then(post => {
        if(post != undefined) {
            User.findAll().then(users => {
                res.render("admin/posts/edit");
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
    var description = req.body.description;
    var file = req.body.file;

    Post.update({description: description, file: file}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/home/posts");
    }).catch(err => {
        res.redirect("/home/posts");
    });
});

router.post("/post/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Post.destroy({
                where: {
                    id: id
                }
            }).then (() => {
                res.redirect("/home/posts");
            });
        }else {
            res.redirect("/home/posts");
        }
    }else {
        res.redirect("/home/posts");
    }
});

router.get("/profile", (req, res) => {
    console.log(req.session.user)
    Post.findAll({ 
        include: [
           { model: User },
        ],
        where: {
            userId: req.session.user.id
        }
    }).then(post => {
        res.render("admin/users/profile", {post: post});
    }) 
});

module.exports = router;