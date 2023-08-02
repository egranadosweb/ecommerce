
const User = require("../../models/User")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const bcrypt = require("bcrypt")


passport.use(new LocalStrategy(function verify(username, password, cb) {
    //consultamos la base de datos en busca del usuario con el nameuser suministrado en el formulario
    console.log("Entró a la funcion verify")
    User.getUsuarioPorNombre(username, (err, row) => {
        console.log(err)
        if (err) return cb(err, null)//Si la consulta en el modelo arroja error

        console.log("Consulta en la bd en busca del usuario exitosa")
        //Validamos si halló alguna coincidencia
        if (row[0].length == 0) {
            console.log("No se hallo ningun usuario con ese nombre en la bd")
            return cb(err, false, { message: "No se halló el usuario, intente de nuevo" })
        }
        //Si halla una coincidencia procedemos a comparar la clave suministrada con la almacenada en la bd
        bcrypt.compare(password, row[0].password, (err, comparacionResultado) => {
            if (err) return cb(err, false, { message: "Usuario o clave incorrecta" })

            //Si la comparacion falla el valor de la variable es false
            if (!comparacionResultado) {
                console.log("Comparacion de claves sin exito")
                return cb(null, false, { message: "Usuario o clave incorrecta" })
            }

            //Si todo es exitoso retornamos los datos del usuario el la callback
            console.log("Login exitoso")
            return cb(null, row[0])
        })
    })
}))

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username })
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})

module.exports = {

    getLogin(req, res, next) {
        return res.render("auth/login")
    },

    getRegister(req, res, next) {
        res.render("auth/register")
    },

    register(req, res, next) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) throw (`Hubo un error generando el salt en el login : ${err}`)
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw (`Hubo un error generando el hash en el login : ${err}`)
                console.log(hash)
                console.log(req.body)
                User.create({ username: req.body.username, nombre: req.body.nombre, password: hash, UsuarioTipo_id: req.body.UsuarioTipo_id }, (err, result) => {
                    console.log(err)
                    if (err) throw err
                    const user = {
                        id: this.lastId,
                        username: req.body.username
                    }
                    req.login(user, function (err) {
                        if (err) { return next(err) }
                        res.redirect("/dashboard/usuarios")
                    })
                })
            })
        })
    },

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err) }
            res.redirect("/login")
        })
    }
}