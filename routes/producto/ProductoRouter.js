
const express = require("express")
const router = express.Router()
const ProductController = require("../../controllers/ProductoController")
const path = require("path")
//multer configuracion
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/productos/img")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.floor(Math.random()*(999-100+1)+100) + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
// ---------------------------------
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

// router.get("/producto/prueba", (req, res ,next) => {
//     res.render("pruebas/create")
// })
// router.post("/producto/prueba", isAuthenticated, (req, res ,next) => {
//     console.log("pruebas")
//     console.log(req.body)
//     return res.send("producto prueba")
// })



router.post("/producto", isAuthenticated, (req, res, next) => {
    
    upload.fields([{ name: "imagen1", maxCount: 1 }, { name: "imagen2", maxCount: 1 }, { name: "imagen3", maxCount: 1 }])(req, res, function (err) {
        if (err) throw err
        req.body.fechaCreacion = new Date()
        req.body.slug = crearSlug(req.body.nombre)

        //Comprobamos si subieron almenos una imagen
        if (Object.keys(req.files).length === 0) {
            console.log(false)
            req.noImagenes = 0
            req.sinImagenes = true
        } else {
            //si subieron imagenes, creamos las siguientes variables en el objeto request para ser usadas mas adelante
            req.sinImagenes = false
            req.noImagenes = Object.keys(req.files).length
        }
       
        console.log("middleware multer")
        next()
    })
    
   

}, (req, res) => {
    console.log("empieza el handler final")

    //creamos un array de objetos con cada imagen en el archivo req.files
    const arrayImagenes = []
    Object.keys(req.files).forEach((key) => {
        console.log(key)
        arrayImagenes.push({ "nombre" : req.files[key][0].filename, "src" : req.files[key][0].destination})
    })

    ProductController.store(req.body, (err, result) => {
        if (err) throw err

        db.query(`select * from categoria`, (err, categorias) => {
            if (err) throw err

            db.query("select * from marca", (err, marcas) => {
                if (err) throw err

                db.query("select * from productoestado", (err, estados) => {
                    if (err) throw err

                    //si no se subieron imagenes , creamos el producto sin imagenes
                    if (req.noImagenes == 0) {
                        return res.render("dashboard/producto/producto.crear.pug", { msg: `Se creo el registro con exito : filas afectadas ${result.affectedRows}`, categorias: categorias, marcas: marcas, estados: estados })
                    }   
                    // si se subieron imagenes, creamos el producto y agregamos los datos de las imagenes en la tabla productoImagenes
                    if (req.noImagenes != 0) {
                        for (let i = 0; i < req.noImagenes; i++) {
                            db.query(`insert into productoImagenes (Producto_id, src, nombre, alt, orden) values (?,?,?,?,?)`, [result.insertId, arrayImagenes[i].src, arrayImagenes[i].nombre, req.body.nombre, i], (err, restulImagen) => {
                                if (err) throw err
                                
                                return res.render("dashboard/producto/producto.crear.pug", { msg: `Se creo el registro con exito : filas afectadas ${result.affectedRows}`, categorias: categorias, marcas: marcas, estados: estados })
                            })
                        }
                    }

                })
            })
        })
    })
})

// router.get("/product/:id", ProductController.show)

// router.delete("/product/:id", ProductController.destroy)

module.exports = router