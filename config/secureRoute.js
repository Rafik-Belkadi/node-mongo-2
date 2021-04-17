const jwt = require('jsonwebtoken');

// On exporte une fonction qui va checker si le token est valide
module.exports = function checkToken(req, res, next) {
    // On récupère le token depuis la requête : req.headers.token ou req.headers['token']
    var token = req.headers['token'];
    // Si le token existe et n'est pas vide
    if (token) {
        // On essaye de décrypter le token, en utilisant jwt.verify(payload, private_key, [options,callback] )
        jwt.verify(token, 'shengriha forever', (err, decode) => {
            //  Si il y a une erreur dans le décryptage on la retourne
            if (err) {
                res.json({
                    "status": 500,
                    "message": "INVALID TOKEN",
                    "error": err.message
                });
            } else {
                // Sinon on passe au middleware prochain
                next();
            }
        })
    } else {
        // Si le token n'existe pas , on retourne une erreur
        res.json({
            "status": 500,
            "message": "NO TOKEN PROVIDE",
            "error": "token must be provide in header for endpoint access"
        });
    }
}


