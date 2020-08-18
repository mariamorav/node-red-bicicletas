const Usuario = require('../models/usuario');
const Token = require('../models/token');

module.exports = {
    confirmationGet: function(req, res, next) {
        Token.findOne({token: req.params.token}, function (err, token) {
            if (!token) return res.status(400).send({type: 'not-verified', msg: 'No se ha encontrado un usuario con este token.' })
            Usuario.findById(token._userId, function(err, usuario) {
                if (!usuario) return res.status(400).send({msg: 'No encontramos un usuario con este Token'})
                if (usuario.verificado) return res.redirect('/usuarios')
                usuario.verificado = true;
                usuario.save(function (err) {
                    if(err) {return res.status(500).send({msg: err.message})}
                    res.redirect('/');
                })
            })
            next();
        })
    }
}