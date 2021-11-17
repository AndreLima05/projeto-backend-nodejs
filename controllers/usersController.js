const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");

router.get("/users", (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    });
}); // colocar em backoffice

router.get("/register",(req, res) => {
    res.render("admin/users/new");
});

router.post("/users/save", (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                username: username,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/home/posts");
            }).catch((err) => {
                res.redirect("/")
            });
        }else {
                res.redirect("/register")
            }
    });
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {

        if(user != undefined) {
            //validação de senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
                res.redirect("/home/posts");
            }else {
                res.redirect("/login");
            }
        }else {
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;