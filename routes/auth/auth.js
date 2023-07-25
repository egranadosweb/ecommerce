
const express = require("express")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const crypto = require("crypto")
const db = require("../../config/db")
const bcrypt = require("bcrypt")

//configuramos la estrategia local en passport para verificar la clave emitida por el formulario con la que se encuentra almacenada en la base datos. Configuramos la serializacion y deserializacion para complementar la configuracion de la session
passport.use(new LocalStrategy(function verify(username, password, cb) {

    db.query("SELECT * FROM user WHERE username = ?", [username], function (err, row, fields) {
        if (err) { return cb(err) }
        if (!row[0]) {
            console.log("No se halló el usuario")
            return cb(null, false, { message: "Usuario o clave incorrecta" })
        }
        console.log("Se halló el usuario, sigue la comparacion de las claves")

        bcrypt.compare(password, row[0].password, function (err, res) {
            if (err) throw (err)

            if (!res) {
                console.log("Las claves no coinciden")
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            console.log("Comparacion exitosa")
            cb(null, row[0])
        })

        // crypto.pbkdf2(password, row[0].salt, 310000, 32, "sha256", function (err, hashedPassword) {//crypto es una clase que nos ayuda con el haseho de los passwords para comprarlos
        //     if (err) { return cb(err) }
        //     console.log(hashedPassword)
        //     console.log(`salt = ${row[0].salt}`)
        //     console.log(row[0].hashed_password)
        //     if (!crypto.timingSafeEqual(row[0].hashed_password, hashedPassword)) {
        //         console.log("Comparación de claves incorrecta")
        //         return cb(null, false, { message: "Usuario o clave incorrecta" })
        //     }
        //     console.log(">>>>> La comparacion fue exitosa")

        //     cb(null, row)
        // })
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





//creamos las rutas
const router = express.Router()

router.get("/login", function (req, res, next) {
    res.render("auth/login")
})

router.post("/login/password", passport.authenticate("local", {
    successReturnToOrRedirect: '/dashboard',
    failureRedirect: "/login",
    failureMessage: true
}))

router.get("/register", function (req, res, next) {
    res.render("auth/register")
})

router.post("/register", function (req, res, next) {

    bcrypt.genSalt(12, (err, salt) => {
        if (err) throw (`Hubo un error generando el salt en el login : ${err}`)
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw (`Hubo un error generando el hash en el login : ${err}`)
            console.log(hash)
            db.query("INSERT INTO user (username, nombre, password, UsuarioTipo_id) values (?,?,?,?)", [req.body.username, req.body.name, hash, 2], function (err, result) {
                console.log(req.body.username, req.body.name, hash)
                if (err) throw (console.log(err))
                const user = {
                    id: this.lastId,
                    username: req.body.username
                }
                req.login(user, function (err) {
                    if (err) { return next(err) }
                    res.redirect("/")
                })
            })
        })
    })

    // const salt = crypto.randomBytes(16)
    // crypto.pbkdf2(req.body.password, salt, 310000, 32,"sha256", function (err, hashedPassword) {
    //     if (err) { return next(err) }
    //     db.query("INSERT INTO user (username,name,hashed_password, salt) values (?,?,?,?)", [req.body.username, req.body.name, hashedPassword, salt], function (err, result) {
    //         if (err) { return next() }
    //         const user = {
    //             id: this.lastId,
    //             username: req.body.username
    //         }
    //         console.log(`hashed password = ${hashedPassword} 
    //         salt = ${salt}`)

    //         req.login(user, function (err) {
    //             if (err) { return next(err) }
    //             res.redirect("/")
    //         })
    //     })
    // })


})

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect("/login")
    })
})


module.exports = router