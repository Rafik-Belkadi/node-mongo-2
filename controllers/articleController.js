const ArticleModel = require('../models/articleModel')


const getAllArticles = (req, res) => {
    ArticleModel.find().populate('auteur').populate('likedBy').then(articles => res.json(articles)).catch(err => res.json(err))
}

const createArticle = (req, res) => {
    var image = req.file
    var newArticle = new ArticleModel({
        titre: req.body.titre,
        contenu: req.body.contenu,
        auteur: req.body.auteur,
        coverPicture: image.filename
    })
    newArticle.save().then(data => res.json(data)).catch(err => res.json(err))
}

// Ajouter getArticleById

// Delete article

// Update Article

const likeArticle = (req, res) => {
    var id = req.params.id
    ArticleModel.findByIdAndUpdate(id, { $push: { likedBy: req.body.userLiking } }).then(article => {
        res.json(article)
    }).catch(err => res.json(err))
}

module.exports = {
    getAllArticles,
    createArticle,
    likeArticle
}