const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var my_secret = "shengriha forever"

const getAllUsers = (req, res) => {
    // Forme then catch
    UserModel.find().populate('articles').then(data => {
        res.json(data)

    }).catch(err => {
        res.json({
            err: err,
            message: "une erreur s'est produite"
        })
    })


    // Forme Callback 
    // UserModel.find((err, resultat) => {
    //     if (err)
    //         throw err;
    //     res.json(resultat)
    // })
}

const getUserById = (req, res) => {
    var id = req.params.id
    UserModel.findById(id).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })

}

const createUser = (req, res) => {
    var { email, password, name } = req.body
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        var newUser = new UserModel({
            email: email,
            password: hash,
            name: name
        })
        newUser.save().then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
    });

}

const signin = (req, res) => {
    // Récupération des infos depuis le body de la requête
    var { email, password } = req.body

    // On vérifie si l'utilisateur existe bien avec cet email
    UserModel.findOne({ email: email }).then(result => {
        // si le résultat est un object vide " {} ", on retourne une erreur
        if (Object.keys(result).length == 0) {
            res.json({
                message: "L'utilisateur n'existe pas, vérifier votre addresse email"
            })
        } else {
            // Sinon on compare le password entré, et le password existant dans la bdd
            bcrypt.compare(password, result.password, (err, same) => {
                if (err) res.json(err)
                // Si les password ne sont pas pareil, retourner une erreur
                if (!same) res.json({ message: "email or password wrong" })
                // Sinon , retourner le user et un message de bienvenu

                jwt.sign(email, my_secret, (err, token) => {
                    console.log(token)
                    if (err) res.json(err)
                    res.json({ user: result, message: "Vous êtes bien connecté", jwt: token })
                })

            })
        }

    }).catch(err => {
        res.json(err)
    })

}

const deleteUser = (req, res) => {
    var id = req.params.id
    UserModel.findByIdAndDelete(id).then(data => res.json(data)).catch(err => res.json(err))
}

const updateUser = (req, res) => {
    var id = req.params.id
    UserModel.findByIdAndUpdate(id, req.body).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    signin
}
