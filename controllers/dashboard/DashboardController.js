
const ProductController = require("../ProductoController")
const CategoriaController = require("../CategoriaController")
const MarcaController = require("../marcaController")
const ProductoImagen = require("../../models/ProductoImagen")
const FormController = require("./FormController")


const { crearSlug, isObjectEmpty } = require("../../utils/utils.functions")
const db = require("../../config/db")
const path = require("path")
// Multer Configuracion
const multer = require("multer")
const Producto = require("../../models/Producto")
const ProductoController = require("../ProductoController")
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/productos/img")
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
// ---------------------------------------------

module.exports = {

    //modulo producto
    listarProductos(req, res, next) {
        ProductController.index((err, rows) => {
            if (err) {
                console.log("No hubo resultados")
                return res.render("dashboard/producto/producto.index.pug", { msg: "No hubo resultados" })
            }
            console.log("probando rows")

            rows.forEach((row, index) => {
                row.srcImagen = path.join("/uploads", `${row.nombreImagen}`)

            })
            res.render("dashboard/producto/producto.index.pug", { rows })
        })
    },

    crearFormProducto(req, res, next){
        FormController.indexSelects((err, categorias, marcas, estados) => {
            if(err) throw err

            res.render("dashboard/producto/producto.crear.pug", {categorias:categorias, marcas:marcas, estados:estados})
        })
    },
    
    editarFormProducto(req, res, next) {

        ProductController.show(req.params.id, (err, producto) => {
            if (err) {
                return res.send("error en editar producto dashboard controller")
            }
            console.log(producto.productoImagenes)

            FormController.indexSelects( (err, categorias, marcas, estados) => {
                if(err) throw err

                console.log(categorias)
                res.render("dashboard/producto/producto.editar.pug", { producto: producto[0], imagenes: producto[1], categorias: categorias, marcas: marcas, estados: estados })
            })

        
        })

    },

    editarProducto(req, res, next) {

        upload.fields([{ name: "imagen1", maxCount: 1 }, { name: "imagen2", maxCount: 1 }, { name: "imagen3", maxCount: 3 }])(req, res, (err) => {
            if (err) throw err
            const isThereImages = !isObjectEmpty(req.files)

            ProductoController.update(req.params.id, req.body, (err, result) => {
                if (err) {
                    console.log("Hubo un error con la consulta editarProducto dashboard controller")
                    return res.send(err)
                } else {
                    console.log("Actualizacion del producto exitosa")
                    console.log(result)
                    //validamos si enviaron imagenes en el formulario y si es asi hacemos algo
                    console.log("Hay imagenes?")
                    console.log(isThereImages)
                    if (isThereImages) {
                        //consultamos a la db si existen imagenes asociadas al producto
                        console.log(true)
                        db.query("select * from producto where id = ?", [req.params.id], (err, datosProducto) => {
                            if (err) {
                                console.log("Huno un error extrayendo los datos del producto para configurar las nuevas imagenes")
                                throw err
                            } else {

                                console.log(datosProducto)
                                //return res.send(datosProducto)
                                Object.keys(req.files).forEach(key => {
                                    if (key === "imagen1") {
                                        db.query("select * from productoImagenes where Producto_id = ? AND orden = 0", [req.params.id], (err, row) => {
                                            if (isObjectEmpty(row)) {
                                                // console.log(req.files[key])
                                                // return res.send("asdasd")
                                                db.query("insert into productoImagenes set ?", [{ Producto_id: req.params.id, src: req.files[key][0].destination, alt: datosProducto[0].nombre, nombre: req.files[key][0].filename, orden: "0" }], (err, result) => {
                                                    if (err) {
                                                        throw err
                                                    }
                                                })
                                            } else {
                                                db.query("update productoImagenes set ? where Producto_id = ? AND orden = 0", [{
                                                    alt: datosProducto[0].nombre, nombre: req.files[key][0].filename
                                                }, req.params.id],
                                                    (err, result) => {
                                                        if (err) {
                                                            throw err
                                                        }
                                                        console.log("actualizacion exitosa de imagen 1")
                                                    })
                                            }
                                        })
                                    }

                                    if (key === "imagen2") {
                                        db.query("select * from productoImagenes where Producto_id = ? AND orden = 1", [req.params.id], (err, row) => {
                                            if (isObjectEmpty(row)) {

                                                db.query("insert into productoImagenes set ?", [{ Producto_id: req.params.id, src: req.files[key][0].destination, alt: datosProducto[0].nombre, nombre: req.files[key][0].filename, orden: "1" }], (err, result) => {
                                                    if (err) {
                                                        throw err
                                                    }
                                                })
                                            } else {
                                                db.query("update productoImagenes set ? where Producto_id = ? AND orden = 1", [{ alt: datosProducto[0].nombre, nombre: req.files[key][0].filename }, req.params.id], (err, result) => {
                                                    if (err) {
                                                        throw err
                                                    }
                                                })
                                            }
                                        })
                                    }

                                    if (key === "imagen3") {
                                        db.query("select * from productoImagenes where Producto_id = ? AND orden = 2", [req.params.id], (err, row) => {
                                            if (isObjectEmpty(row)) {
                                                // console.log(req.files[key])
                                                // return res.send("asdasd")
                                                db.query("insert into productoImagenes set ?", [{ Producto_id: req.params.id, src: req.files[key][0].destination, alt: datosProducto[0].nombre, nombre: req.files[key][0].filename, orden: "2" }], (err, result) => {
                                                    if (err) {
                                                        throw err
                                                    }
                                                })
                                            } else {
                                                db.query("update productoImagenes set ? where Producto_id = ? AND orden = 2", [{ alt: datosProducto[0].nombre, nombre: req.files[key][0].filename }, req.params.id], (err, result) => {
                                                    if (err) {
                                                        throw err
                                                    }
                                                })
                                            }
                                        })
                                    }

                                })

                            }
                        })

                    } else {// si no envian imagenes en el formulario hacemos elo siguiente

                    }

                }
            })

        })

    },





    crear(req, res, next) {

    },

    editar(req, res, next) {

    },

    eliminar(id, res) {
        ProductController.destroy(id, (err, result) => {
            if (err) throw err
            return res.redirect("/dashboard/producto")
        })
    },






    listarCategorias(req, res, next) {
        const categorias = CategoriaController.index((err, categorias) => {
            if (err) {
                throw err
            }
            return res.render("dashboard/producto/producto.categorias.pug", { categorias })
        })
    }
    ,

    crearCategoria(req, res, next) {
        console.log(req.body)
        const slug = crearSlug(req.body.nombre)
        req.body.slug = slug
        CategoriaController.store(req.body, (err, result) => {
            if (err) {
                if (err.errno) {
                    return res.json({
                        msg: "Actualizacion exitosa",
                        err: err
                    }
                    )
                }
            }
            //res.json({msg : "Creación exitosa", err : null, "result" : result})
            res.redirect("/dashboard/producto/categorias")
        })
    },

    editarCategoria(req, res, next) {
        console.log(req.body)

        CategoriaController.update(req.body, (err, result) => {
            if (err) {
                if (err.errno) {
                    return res.json({
                        msg: "Actualizacion exitosa",
                        err: err
                    }
                    )
                }
            }
            res.json({ msg: "Actualizacion exitosa", err: null, "result": result })
        })
    },

    eliminarCategoria(req, res, next) {
        console.log(req.body.id)
        CategoriaController.destroy(req.body.id, (err, result) => {
            if (err) throw err
            res.json({ msg: "Eliminacion exitosa", err: null })
        })
    },








    listarMarcas(req, res, next) {
        const marcas = MarcaController.index((err, marcas) => {
            if (err) {
                throw err
            }
            return res.render("dashboard/producto/producto.marcas.pug", { marcas })
        })
    }
    ,

    crearMarca(req, res, next) {
        console.log(req.body)
        const slug = crearSlug(req.body.nombre)
        req.body.slug = slug
        MarcaController.store(req.body, (err, result) => {
            if (err) {
                if (err.errno) {
                    return res.json({
                        msg: "Actualizacion exitosa",
                        err: err
                    }
                    )
                }
            }
            //res.json({msg : "Creación exitosa", err : null, "result" : result})
            res.redirect("/dashboard/producto/marcas")
        })
    },

    editarMarca(req, res, next) {
        console.log(req.body)

        MarcaController.update(req.body, (err, result) => {
            if (err) {
                if (err.errno) {
                    return res.json({
                        msg: "Actualizacion exitosa",
                        err: err
                    }
                    )
                }
            }
            res.json({ msg: "Actualizacion exitosa", err: null, "result": result })
        })
    },

    eliminarMarca(req, res, next) {
        console.log(req.body.id)
        MarcaController.destroy(req.body.id, (err, result) => {
            if (err) throw err
            res.json({ msg: "Eliminacion exitosa", err: null })
        })
    },










    buscar(req, res, next) {

    },


}