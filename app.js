const express = require('express')
const app = express()
const db = require('./config/db')
const UserRouter = require('./routes/userRoute')
const ArticleRouter = require('./routes/articleRoute')
const bodyParser = require('body-parser');

// Utilisation du midllware bodyParser
app.use(bodyParser.json())

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



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
