
const express = require("express")
const path = require("path")
require("dotenv").config()
const logger = require("morgan")
const passport = require("passport")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)

const productoRouter = require("./routes/producto/ProductoRouter")
const authRouter = require("./routes/auth/auth")
const dashboardRouter = require("./routes/dashboard/DashboardRouter")
const errorRouter = require("./routes/ErrorRouter")
const categoriaRouter = require("./routes/producto/CategoriaRouter")
// var methodOverride = require("method-override")

const app = express()
const port = process.env.PORT || 2900
const mysqlOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
app.use(express.json())
const sessionStore = new MySQLStore(mysqlOptions)

app.use(session({//Se debe configurar la session antes de registrar la ruta que se encarga de la authentificacion y del registro del middleware de Passport en este archivo
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))
sessionStore.onReady().then(() => {
    console.log("Session store ready")
}).catch((err) => {
    console.log(">>>>> No se pudo activar la sessionStore")
    console.log(err)
})

app.use("/css", express.static( path.join(__dirname, "/public/dashboard/css")))
app.use("/img", express.static( path.join(__dirname, "/public/dashboard/img")))
app.use("/img/productos", express.static( path.join(__dirname, "/public/img/productos")))
app.use("/js", express.static( path.join(__dirname, "/public/dashboard/js")))

app.set("view engine", "pug")
app.set("views", path.join(__dirname + "/views"))


app.use(logger("combined"))
app.use(express.urlencoded({ extended: true }))

app.use(passport.authenticate("session"))//Se debe registrar antes de registrar las rutas


app.get("/", (req, res) => {
    console.log("Prueba ruta inicial")
    res.send("Ruta principal")
})
app.get("/prueba", (req, res ,next) => {
    if(req.query.nombre){
        return next()
    }
    return res.send("Falta parametro en la ruta")
} , (req, res) => {
    console.log("Prueba ruta inicial")
    res.send("El valor del parametro nombre es " + req.query.nombre)
})

app.use("/", authRouter)
app.use("/", productoRouter)
app.use("/", dashboardRouter)
app.use("/", categoriaRouter)
app.use("/", errorRouter)






//Levantamos el server en el puerto suministrado
app.listen(port, (err) => {
    if (err) throw err
    console.log("El servidor inició exitosamente")
})