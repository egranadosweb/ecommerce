
const express = require("express") //corazon del framewrok express
const path = require("path") // paquete aux para manejar rutas
require("dotenv").config() // paquete utilizar el .env
const logger = require("morgan") // middleware para mostrar en consola las peticiones http
const passport = require("passport") // middleware que se encarga de la autenticacion
const session = require("express-session") // midleware para habilitar la sesiones
const MySQLStore = require("express-mysql-session")(session) // paquete para crear las tablas para las sessiones en MYsql

// Incluimos los modulos de las rutas
const productoRouter = require("./routes/producto/ProductoRouter")
const authRouter = require("./routes/auth/auth")
const dashboardRouter = require("./routes/dashboard/DashboardRouter")
const errorRouter = require("./routes/ErrorRouter")
// ----------------------------------------------------------------------
// var methodOverride = require("method-override")
// Configuramos las variables para levantar el servidor y configurar el middleware de sessiones y passport
const app = express()
const port = process.env.PORT || 2900
const mysqlOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
app.use(express.json()) // Registramos el middleware que se encarga de formatear los datos enviados por post en req.body
app.use(express.urlencoded({ extended: true }))
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

// creamos las rutas estaticas
app.use("/uploads", express.static( path.join(__dirname, "/uploads/productos/img")))
app.use("/css", express.static( path.join(__dirname, "/public/dashboard/css")))
app.use("/img", express.static( path.join(__dirname, "/public/dashboard/img")))
app.use("/img/productos", express.static( path.join(__dirname, "/public/img/productos")))
app.use("/js", express.static( path.join(__dirname, "/public/dashboard/js")))
// -------------------
// Configuramos pug como nuestro motor de plantillas para las vistas
app.set("view engine", "pug")
app.set("views", path.join(__dirname + "/views"))// configuramos el directorio views como directorio para ls vistas


app.use(logger("combined")) // registramos y configuramos Morgan

app.use(passport.authenticate("session"))//Se debe registrar antes de registrar las rutas

// rutas de prueba
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
// -------------------------

// REGISTRAMOS LAS RUTAS EN EL ORDEN CORRECTO
app.use("/", authRouter)
app.use("/", productoRouter)
app.use("/", dashboardRouter)
app.use("/", errorRouter)
//---------------------------------

//Levantamos el server en el puerto suministrado
app.listen(port, (err) => {
    if (err) throw err
    console.log("El servidor inició exitosamente")
})