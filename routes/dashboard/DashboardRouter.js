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
router.get("/dashboard/producto/:id/editar", isAuthenticated, DashboardController.editarFormProducto)
router.post("/dashboard/producto/:id/editar", isAuthenticated, DashboardController.editarProducto)
router.post("/dashboard/producto/:id/eliminar", isAuthenticated , (req, res) => {
    //res.send(req.params.id)
    DashboardController.eliminar(req.params.id, res)
})


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

//modulo cliente


//modulo usuario


//modulo ordenes

module.exports = router