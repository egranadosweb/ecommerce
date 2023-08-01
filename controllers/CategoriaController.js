
const Categoria = require("../models/Categoria")

module.exports = {

    index: function (cb) {
        Categoria.all(function (err, rows) {
            if (err) {
                cb(err, null)
            }
            //
            //console.log(rows)
            console.log("prueba index categoriaController")
            cb(null, rows)
        })
    },

    create: function (req, res, next) {
        res.send("Mostramos el form para agregar una categoria")
    },

    store: function (datos,cb) {
        Categoria.create(datos, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    update: function (datos, cb) {
        Categoria.update(datos, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    show: function (req, res, next) {
        Categoria.findOne(req.params.id, function (err, result) {
            res.send(result)
        })
    },

    destroy: function (id, cb) {
        Categoria.delete(id, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    getBySlug: function (req, res, next) {
        Categoria.findBySlug(req.params.slug, function (err, row) {
            res.send(row)
        })
    },

    getByName: function (req, res, next) {
        Categoria.findByName(req.params.name, function (err, row) {
            res.send(row)
        })
    },

}