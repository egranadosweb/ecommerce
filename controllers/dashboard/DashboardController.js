
const ProductController = require("../../controllers/ProductoController")
const Categoria = require("../../models/Categoria")
const Marca = require("../../models/Marca")
const Estado = require("../../models/Estado")

module.exports = {

    //modulo producto
    listar(req,res,next){
        ProductController.index((err, rows) => {
            if (err) {
                console.log("No hubo resultados")
                return res.render("dashboard/producto/producto.index.pug", { msg: "No hubo resultados" })
            }
            res.render("dashboard/producto/producto.index.pug", { rows })
        })
    },

    crear(req,res,next){
        
    },

    editar(req,res,next){
        
    },

    eliminar(id, res){
        ProductController.destroy(id, (err, result) => {
            if(err) throw err
            return res.redirect("/dashboard/producto")
        })
    },

    buscar(req,res,next){
        
    },


}