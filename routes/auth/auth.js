
const express = require("express")
const AuthController = require("../../controllers/dashboard/AuthController")
const {isAuthenticated} = require("../../utils/utils.functions")
const passport = require("passport")

//creamos las rutas para los procesos concernientes a la autenticacion
const router = express.Router()

router.get("/login", AuthController.getLogin)
router.post("/login/password", passport.authenticate("local", {
    successReturnToOrRedirect: '/dashboard',
    failureRedirect: "/login",
    failureMessage: true
}))
router.get("/register", isAuthenticated, AuthController.getRegister)
router.post("/register", isAuthenticated, AuthController.register)
router.post("/logout", isAuthenticated, AuthController.logout)

module.exports = router