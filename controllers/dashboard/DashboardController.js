// Controladores -----------
const ProductoController = require("../ProductoController")
const CategoriaController = require("../CategoriaController")
const MarcaController = require("../marcaController")
const ProductoImagen = require("../../models/ProductoImagen")
const FormController = require("./FormController")
const AuthController = require("./AuthController")
// Modelos ------------------------------
const Producto = require("../../models/Producto")
const User = require("../../models/User")
// Paquetes auxiliares ----------------------
const { crearSlug, isObjectEmpty } = require("../../utils/utils.functions")
const db = require("../../config/db")
const fs = require("fs")
const path = require("path")
// Multer Configuracion
const multer = require("multer")
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/productos/img")
    },
    filename(req, file, cb) {
        cb(null, Date.now() + Math.floor(Math.random()*(999-100+1)+100) + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
// ---------------------------------------------


module.exports = {

    //--- MODULO PRODUCTOS -----------------------------------------------
    listarProductos(req, res, next) {
        ProductoController.index((err, rows) => {
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

    crearFormProducto(req, res, next) {
        FormController.indexSelects((err, categorias, marcas, estados) => {
            if (err) throw err

            res.render("dashboard/producto/producto.crear.pug", { categorias: categorias, marcas: marcas, estados: estados })
        })
    },

    editarFormProducto(req, res, next) {

        ProductoController.show(req.params.id, (err, producto) => {
            if (err) {
                return res.send("error en editar producto dashboard controller")
            }

            const imagenes = { imagen1: "no-tiene", imagen2: "no-tiene", imagen3: "no-tiene" }
            FormController.indexSelects((err, categorias, marcas, estados) => {
                if (err) throw err

                producto[1].forEach((item, index) => {
                    if (item.orden == "0") {
                        imagenes.imagen1 = item
                    }
                    if (item.orden == "1") {
                        imagenes.imagen2 = item
                    }
                    if (item.orden == "2") {
                        imagenes.imagen3 = item
                    }
                })
                
                res.render("dashboard/producto/producto.editar.pug", { producto: producto[0], imagenes: imagenes, categorias: categorias, marcas: marcas, estados: estados })
            })


        })

    },

    editarProducto(req, res, next) {

        upload.fields([{ name: "imagen1", maxCount: 1 }, { name: "imagen2", maxCount: 1 }, { name: "imagen3", maxCount: 3 }])(req, res, (err) => {
            if (err) throw err

            if (Object.keys(req.body).length > 0) {
                ProductoController.update(req.params.id, req.body, (err, result) => {
                    if (err) throw err
                    console.log("Actualización de los datos del producto exitosa")
                })
            }

            // Iteramos sobre cada imagen que se envió en el formulario y determinamos si se crea por primera vez o si es actualizacion de una existente
            if (Object.keys(req.files).length > 0) {
                ProductoController.show(req.params.id, (err, datosProducto) => {
                    if (err) throw err
                    console.log("Recuperación de la información del producto exitosa")

                    Object.keys(req.files).forEach(key => {
                        if (key === "imagen1") {
                            db.query("select * from productoImagenes where Producto_id = ? AND orden = 0", [req.params.id], (err, row) => {
                                if (isObjectEmpty(row)) {
                                    ProductoImagen.create({ Producto_id: req.params.id, alt: datosProducto[0].nombre, nombre: req.files[key][0].filename, orden: "0" }, (err, result) => {
                                        if (err) throw err
                                        console.log(`Creacion exitosa de la imagen 1 del producto ${req.params.id}`)
                                    })
                                } else {
                                    fs.unlink(process.cwd() + "/uploads/productos/img/" + row[0].nombre, (err) => {
                                        if (err) {
                                            console.log("Hubo un error eliminando la imagen antes de actualizar la imagen1 del producto, imagen: " + row[0].nombre)
                                            throw err
                                        }
                                        console.log("Se eliminó exitosamente la imagen 1 del producto antes de actualizarla")
                                        ProductoImagen.update(req.params.id, { alt: datosProducto[0].nombre, nombre: req.files[key][0].filename }, "0", (err, result) => {
                                            if (err) throw err
                                            console.log("actualizacion exitosa de imagen 1")
                                        })
                                    })

                                }
                            })
                        }

                        if (key === "imagen2") {
                            db.query("select * from productoImagenes where Producto_id = ? AND orden = 1", [req.params.id], (err, row) => {
                                if (isObjectEmpty(row)) {
                                    ProductoImagen.create({ Producto_id: req.params.id, alt: datosProducto[0].nombre, nombre: req.files[key][0].filename, orden: "1" }, (err, result) => {
                                        if (err) throw err
                                        console.log(`Creacion exitosa de la imagen 2 del producto ${req.params.id}`)
                                    })
                                } else {
                                    fs.unlink(process.cwd() + "/uploads/productos/img/" + row[0].nombre, (err) => {
                                        if (err) {
                                            console.log("Hubo un error eliminando la imagen antes de actualizar la imagen2 del producto, imagen: " + row[0].nombre)
                                            throw err
                                        }
                                        console.log("Se eliminó exitosamente la imagen 2 del producto antes de actualizarla")
                                        ProductoImagen.update(req.params.id, { alt: datosProducto[0].nombre, nombre: req.files[key][0].filename }, "1", (err, result) => {
                                            if (err) throw err
                                            console.log("actualizacion exitosa de imagen 2")
                                        })
                                    })

                                }
                            })
                        }

                        if (key === "imagen3") {
                            db.query("select * from productoImagenes where Producto_id = ? AND orden = 2", [req.params.id], (err, row) => {
                                if (isObjectEmpty(row)) {
                                    ProductoImagen.create({ Producto_id: req.params.id, alt: datosProducto[0].nombre, nombre: req.files[key][0].filename, orden: "2" }, (err, result) => {
                                        if (err) throw err
                                        console.log(`Creacion exitosa de la imagen 3 del producto ${req.params.id}`)
                                    })
                                } else {
                                    fs.unlink(process.cwd() + "/uploads/productos/img/" + row[0].nombre, (err) => {
                                        if (err) {
                                            console.log("Hubo un error eliminando la imagen antes de actualizar la imagen3 del producto, imagen: " + row[0].nombre)
                                            throw err
                                        }
                                        console.log("Se eliminó exitosamente la imagen 3 del producto antes de actualizarla")
                                        ProductoImagen.update(req.params.id, { alt: datosProducto[0].nombre, nombre: req.files[key][0].filename }, "2", (err, result) => {
                                            if (err) throw err
                                            console.log("actualizacion exitosa de imagen 3")
                                        })
                                    })

                                }
                            })
                        }
                    })
                    // Redireccion a la ruta que que muestra el formulario editar 
                    setTimeout(() => {
                        return res.redirect(`/dashboard/producto/editar/${req.params.id}`)
                    },200)
                    
                })
            }




        })

    },

    eliminarProducto(req, res) {
        ProductoController.destroy(req.params.id, (err, result) => {
            if (err) throw err
            return res.redirect("/dashboard/producto")
        })
    },




    // MODULO CATEGORIAS -------------------------------------
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




    // RUTAS PARA MANIPULAR LAS MARCAS
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



    // Modulo usuarios ---------------

    listarUsuarios(req, res , next){
        User.all((err, usuarios) => {
            if(err) throw err

            res.render("dashboard/usuario/usuario.index.pug", {usuarios})
        })
    },

    crearFormUsuario(req, res , next){
        FormController.tipoUsuarioSelect((err, usuariotipo) => {
            if(err) throw err
            res.render("dashboard/usuario/usuario.crear.pug", {usuariotipo})
        })
        
    } ,

    crearUsuario(req, res , next){
        AuthController.register(req, res, next)
    } ,

    eliminarUsuario(req, res ,next){
        User.delete(req.params.id, (err, result) => {
            if(err) throw err

            return res.redirect("/dashboard/usuarios")
        })
    }


}