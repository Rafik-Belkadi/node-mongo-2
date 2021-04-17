const router = require('express').Router()
const { getAllArticles, createArticle, likeArticle } = require('../controllers/articleController')

router.route('/articles').get(getAllArticles)
    .post(createArticle)

router.route('/articles/likes/:id').put(likeArticle)


module.exports = router