const router = require('express').Router()
const { getAllUsers, getUserById, createUser, deleteUser, signin } = require('../controllers/userController')
const checkToken = require('../config/secureRoute')
router.route('/users').get(checkToken, getAllUsers)
    .post(checkToken, createUser)

router.route('/users/:id').get(checkToken, getUserById)
    .delete(checkToken, deleteUser)

router.route('/signin').post(signin)



module.exports = router