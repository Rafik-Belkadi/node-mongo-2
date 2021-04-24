const mongoose = require('mongoose');

// Importer l'object Schema qui permet de créer des schémas de collections
const Schema = mongoose.Schema

// Définition du schéma de la collection
const ArticleSchema = new Schema({
    titre: String,
    contenu: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    auteur: {
        ref: "users",
        type: Schema.Types.ObjectID
    },
    likedBy: [{
        ref: "users",
        type: Schema.Types.ObjectID
    }],
    coverPicture: String
})

// Création du model de la collection, qui permettera
// l'éxcustion de requêtes
const ArticleModel = mongoose.model('articles', ArticleSchema)


module.exports = ArticleModel