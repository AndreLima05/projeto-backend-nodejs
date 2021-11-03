const express = require("express");
const app = express();
const connection = require("./database/database");

const usersControler = require("./controllers/usersController");

const User = require("./models/User");

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

app.get("/",function(req,res){
    res.render("index");
});

app.use("/",usersControler);

app.listen(5000,()=>{console.log("Servidor ativo!");});