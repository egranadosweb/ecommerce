const express = require("express")
const router = express.Router()
const DashboardController = require("../../controllers/dashboard/DashboardController")
const {isAuthenticated} = require("../../utils/utils.functions")
const db = require("../../config/db")

router.get("/dashboard", (req,res,next) => {
    if(req.isAuthenticated()){
       return next() 
    }
    console.log("No esta autenticado")
    res.redirect("/login")
}, (req,res,next) => {
    console.log(req)
    console.log("Esta autenticado")
    res.render("dashboard/index")
})


//modulo producto
router.get("/dashboard/producto/", isAuthenticated, DashboardController.listar)

router.get("/dashboard/producto/crear", isAuthenticated, (req, res) => {
    db.query(`select * from categoria`,(err, categorias)=>{
        if(err) throw err
        db.query("select * from marca", (err, marcas) => {
            if(err) throw err
            db.query("select * from productoestado", (err, estados) => {
                if(err) throw err
                res.render("dashboard/producto/producto.crear.pug",{categorias : categorias, marcas : marcas, estados : estados})
            })
        })
    })
})

router.post("/dashboard/producto/:id/eliminar", isAuthenticated , (req, res) => {
    //res.send(req.params.id)
    DashboardController.eliminar(req.params.id, res)
})




//modulo cliente


//modulo usuario


//modulo ordenes

module.exports = router