const express = require("express")
const router = express.Router()

const DashboardController = require("../../controllers/dashboard/DashboardController")

const {isAuthenticated} = require("../../utils/utils.functions")
const db = require("../../config/db")



//Ruta raiz del dashboard
router.get("/dashboard", isAuthenticated , (req,res,next) => {
    res.render("dashboard/index")
})

//modulo producto
router.get("/dashboard/producto/", isAuthenticated, DashboardController.listarProductos)
router.get("/dashboard/producto/crear", isAuthenticated, DashboardController.crearFormProducto)
router.get("/dashboard/producto/editar/:id", isAuthenticated, DashboardController.editarFormProducto)
router.post("/dashboard/producto/:id/editar", isAuthenticated, DashboardController.editarProducto)
router.post("/dashboard/producto/:id/eliminar", isAuthenticated , DashboardController.eliminarProducto)


//modulo categorias
router.get("/dashboard/producto/categorias", isAuthenticated, DashboardController.listarCategorias)
router.post("/dashboard/producto/categorias", isAuthenticated, DashboardController.crearCategoria)
router.post("/dashboard/producto/categorias/:id/editar", isAuthenticated, DashboardController.editarCategoria)
router.post("/dashboard/producto/categorias/:id/eliminar", isAuthenticated, DashboardController.eliminarCategoria)


//modulo marcas
router.get("/dashboard/producto/marcas", isAuthenticated, DashboardController.listarMarcas)
router.post("/dashboard/producto/marcas", isAuthenticated, DashboardController.crearMarca)
router.post("/dashboard/producto/marcas/:id/editar", isAuthenticated, DashboardController.editarMarca)
router.post("/dashboard/producto/marcas/:id/eliminar", isAuthenticated, DashboardController.eliminarMarca)

// Modulo Usuarios --------------
router.get("/dashboard/usuarios", DashboardController.listarUsuarios)
router.post("/dashboard/usuarios/:id/eliminar", DashboardController.eliminarUsuario)
router.get("/dashboard/usuario/crear", DashboardController.crearFormUsuario)
router.post("/dashboard/usuario/crear", DashboardController.crearUsuario)

//modulo cliente

//modulo ordenes

module.exports = router