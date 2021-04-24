const router = require('express').Router()
const { getAllArticles, createArticle, likeArticle } = require('../controllers/articleController')

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.split('.')[1]
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
})

var upload = multer({ storage: storage })


router.route('/articles').get(getAllArticles)
    .post(upload.single('coverPicture'), createArticle)

router.route('/articles/likes/:id').put(likeArticle)


module.exports = router