const mongoose = require('mongoose');

// Importer l'object Schema qui permet de créer des schémas de collections
const Schema = mongoose.Schema

// Définition du schéma de la collection
const UserSchema = new Schema({
    email : String,
    password: String,
    name: String,
    createdAt : {
        type: Date,
        default: new Date(),
    },
    articles: [{
        ref: "articles",
        type: Schema.Types.ObjectID
    }]
})

// Création du model de la collection, qui permettera
// l'éxcustion de requêtes
const UserModel = mongoose.model('users', UserSchema)


module.exports = UserModel