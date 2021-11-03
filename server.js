const express = require("express");
const app = express();
const connection = require("./database/database.js");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com a base de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Instrução para o Express usar o EJS como View engine
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render("index");
});

app.listen(5000,()=>{console.log("Servidor ativo!");});