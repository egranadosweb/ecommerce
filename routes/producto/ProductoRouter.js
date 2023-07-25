
const express = require("express")
const router = express.Router()
const ProductController = require("../../controllers/ProductoController")
const os = require('node:os');
const multer = require("multer")


const db = require("../../config/db")
const { isAuthenticated, crearSlug } = require("../../utils/utils.functions")




router.get("/productos", (req, res, next) => {//mostrar todos los productos en el ecommerce
    ProductController.index((err, rows) => {
        if (err) {
            console.log("No hubo resultados")
            return res.render("producto/index", { msg: "No hubo resultados" })
        }
        res.render("producto/index", { rows })
    })
})

router.get("/:slugProducto", ProductController.getProductBySlug)//mostrar un producto por su slug

router.get("/producto/categoria/:slugCategoria", ProductController.getProductByCategory)//mostrar productos por categoria

router.get("/producto/marca/:slugMarca", ProductController.getProductByMarca)//mostrar productos por categoria

// router.get("/producto/crear", isAuthenticated, (req, res, next) => {
//     res.render("producto/create")
// })

router.post("/producto", isAuthenticated, (req, res, next) => {
    // req.body.fechaCreacion = new Date()
    // req.body.slug = crearSlug(req.body.nombre)
    // Object.keys(req.body).forEach((key => {
    //     if(req.body[key] == ""){
    //         delete req.body[key]
    //     }
    // }))

    const upload = multer({dest : "public/img/productos"})

    upload.single('imagen1')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log("un multe error")
            console.log(err)
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log("un error desconocido")
        }
        // Everything went fine. 
        console.log("req file")
        console.log(req.file)
        return res.send("todo estuvo bien")
    })


}, (req, res) => {
    ProductController.store(req.body, (err, result) => {
        if (err) throw err

        db.query(`select * from categoria`, (err, categorias) => {
            if (err) throw err

            db.query("select * from marca", (err, marcas) => {
                if (err) throw err

                db.query("select * from productoestado", (err, estados) => {
                    if (err) throw err

                    return res.render("dashboard/producto/producto.crear.pug", { msg: `Se creo el registro con exito : filas afectadas ${result.affectedRows}`, categorias: categorias, marcas: marcas, estados: estados })
                })
            })
        })

        // db.query(`select * from categoria`, (err, categorias) => {
        //     if (err) throw err

        //     db.query("select * from marca", (err, marcas) => {
        //         if (err) throw err

        //         db.query("select * from productoestado", (err, estados) => {
        //             if (err) throw err

        //             
        //         })
        //     })
        // })
    })
})

// router.get("/product/:id", ProductController.show)

// router.delete("/product/:id", ProductController.destroy)

module.exports = router