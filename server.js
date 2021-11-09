const express = require("express");
const session = require("express-session");
const app = express();
const connection = require("./database/database");

const usersControler = require("./controllers/usersController");
const postsController = require("./controllers/postsController");

const User = require("./models/User");
const Post = require("./models/Post");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com a base de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Instrução para o Express usar o EJS como View engine
app.set('view engine','ejs');

//Express-session
app.use(session({
    secret: "qualquercoisa", 
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30000 }
}))


app.get("/",function(req,res){
    res.render("index");
});

app.use("/",usersControler);
app.use("/",postsController);

app.listen(5000,()=>{console.log("Servidor ativo!");});