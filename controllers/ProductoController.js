
const Product = require("../models/Producto")
const { crearSlug } = require("../utils/utils.functions")


module.exports = {
    index(callback) {

        Product.all((err, rows) => {
            if (err) throw err
            if (rows.length != 0) {
                return callback(null, rows)
            }
            return callback({ cant: 0, msg: "No hubieron resultado" }, null)
        })

    },


    store(datos, callback) {

        Product.create(datos, (err, result) => {
            if (err){
                return callback(err, null)
            }
            console.log(result.affectedRows)
            return callback(null, result)
        })

    },


    show(req, res) {

        Product.findOne(req.params.id, (err, row) => {
            if (err) throw err
            console.log(row)
            res.render("producto/index", { rows: row })
        })

    },


    destroy(id, callback) {

        Product.destroy(id, (err, result) => {
            if (err) throw err
            console.log(result)
            return callback(null, result)
        })

    },


    getProductBySlug(req, res, next) {

        Product.findProductBySlug(req.params.slugProducto, function (err, row) {
            if (err) throw err
            if (row[0]) {
                return res.render("producto/index", { rows: row })
            }
            next()
        })

    },


    getProductByCategory(req, res, next) {

        Product.findProductByCategory(req.params.slugCategoria, function (err, rows) {
            if (err) throw err
            if (rows.length != 0) {
                return res.render("producto/index", { rows })
            }
            next()
        })

    },


    getProductByMarca: function (req, res, next) {

        Product.findProductByMarca(req.params.slugMarca, function (err, rows) {
            if (err) throw err

            if (rows.length != 0) {
                return res.render("producto/index", { rows })
            }

            next()
        })

    },


}