const CategoriaController = require("../CategoriaController")
const MarcaController = require("../MarcaController")
const EstadoController = require("../EstadoController")

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



}
