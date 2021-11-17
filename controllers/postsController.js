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
            return {
                id: item.id,
                username: item.username,
                description: item.description,
                share_comments: item.share_comments,
                updatedAt: item.updatedAt, 
                isFromUser: id === item.userId
            }
        })
        res.render("admin/posts/index", {posts: mappedPosts});
    })
});

router.post("/post/save", adminAuth, (req, res) => {

    var description = req.body.description;
    var file = req.body.file;

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
                res.render("admin/posts/edit", {post: post});
        } else {
            res.redirect("/home/post");
        }
    }).catch(err => {
        res.redirect("/home/posts");
    });
});

router.post("/post/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var description = req.body.description;
    console.log(description, id);
    Post.update({description: description}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/home/posts");
    }).catch(err => {
        res.redirect("/home/posts");
    });
});

router.post("/post/delete", adminAuth, async (req, res) => {
    var id = req.body.id;
    if(id != undefined && !isNaN(id)) {
            await ShareComment.destroy({
                where: {
                    postId: id
                }
            }) 
            await Post.destroy({
                where: {
                    id: id
                }
            })                 
        }
    res.redirect("/home/posts");
});

router.get("/profile", (req, res) => {

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