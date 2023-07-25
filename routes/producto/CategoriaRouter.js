
const express = require("express")
const router = express.Router()
const CategoriaController = require("../../controllers/CategoriaController")
const {isAuthenticated} = require("../../utils/utils.functions")

router.get("/categorias", CategoriaController.index)

router.get("/categorias/create", CategoriaController.create)

router.post("/categorias", CategoriaController.store)

router.get("/categorias/:id", CategoriaController.show)

router.get("/categorias/:id/delete", isAuthenticated, CategoriaController.delete)

router.get("/categorias/slug/:slug", CategoriaController.getBySlug)

router.get("/categorias/nombre/:name", CategoriaController.getByName)

module.exports = router