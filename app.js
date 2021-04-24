const express = require('express')
const app = express()
const db = require('./config/db')
const UserRouter = require('./routes/userRoute')
const ArticleRouter = require('./routes/articleRoute')
const bodyParser = require('body-parser');
var path = require('path');

// Utilisation du midllware bodyParser
app.use(bodyParser.json())


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/public', express.static(path.join(__dirname, 'public')))

// Utilisation de nos router
app.use(UserRouter)
app.use(ArticleRouter)


app.get('/', (req, res) => {
    res.send("hello word")
})


// 1- creer le model ArticleModel
// 2- créer ArticleController avec: CRUD Article
// 3- créer ArticleRoute : Crud
// N'oubliez pas d'importer le router (ArticleRouter) dans app.js et de faire app.use(ArticleRouter)



app.listen(3001, () => {
    console.log("Server is running on port 3000")
})
