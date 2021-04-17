// Importer Mongoose, la bibliothèque mongodb 
const mongoose = require('mongoose');

// se connecter à la bdd  mongoose.connect(url, options, callback)
mongoose.connect("mongodb://localhost:27017/db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err)
        console.log(err)
    else
        console.log("Tout est bon")
})


module.exports = mongoose.connection