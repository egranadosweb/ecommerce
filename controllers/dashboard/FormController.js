const CategoriaController = require("../CategoriaController")
const MarcaController = require("../MarcaController")
const EstadoController = require("../EstadoController")
const UsuarioTipo = require("../../models/UsuarioTipo")

module.exports = {

    indexSelects(cb){
        CategoriaController.index((err, categorias) => {
            if(err) return cb(err, null)

            MarcaController.index((err, marcas) => {
                if(err) return cb(err, null)

                EstadoController.index((err, estados) => {
                    if(err) return cb(err, null)

                    return cb(null, categorias, marcas, estados)
                })
            })
        })
    },

    tipoUsuarioSelect(cb){
        UsuarioTipo.all((err, rows) => {
            if(err) return cb(err)
            return cb(null, rows)
        })
    },



}
