const express = require("express");
const dotenv = require('dotenv');
const session = require("express-session");
const app = express();
const connection = require("./database/database");

const usersControler = require("./controllers/usersController");
const postsController = require("./controllers/postsController");
const commentsController = require("./controllers/commentsController");

// Load env vars
dotenv.config({ path: './config/config.env' });

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
    cookie: { maxAge: 48*60*60*1000 }
}));

app.get("/",function(req,res){
    res.render("index");
});

app.use("/",usersControler);
app.use("/",postsController);
app.use("/",commentsController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`));