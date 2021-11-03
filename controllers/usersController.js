const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.get("/admin/users/new",(req, res) => {
    res.render("admin/users/new");
});

router.post("/users/save", (req, res) => {
    var userName = req.body.username;
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                username: userName,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/")
            });
        }else {
                res.redirect("/admin/users/new")
            }
    });
});

module.exports = router;