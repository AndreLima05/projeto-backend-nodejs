const express = require("express");
const app = express();

// Instrução para o Express usar o EJS como View engine
app.set('view engine','ejs');

app.get("/",function(req,res){
    res.render("index");
});

app.listen(5000,()=>{console.log("Servidor ativo!");});