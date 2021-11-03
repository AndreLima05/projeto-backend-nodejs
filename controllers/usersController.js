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

router.get("/admin/users", (req, res) => {
    res.render("admin/users/index");
})


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
                    email: user.email
                }
                res.redirect("admin/users");
            }else {
                res.redirect("/login");
            }
        }else {
            res.redirect("/login");
        }
    });
});

module.exports = router;