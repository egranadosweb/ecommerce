
const Marca = require("../models/Marca")

module.exports = {

    index: function (cb) {
        Marca.all(function (err, rows) {
            if (err) {
                cb(err, null)
            }
            //
            //console.log(rows)
            console.log("prueba index marcaController")
            cb(null, rows)
        })
    },

    create: function (req, res, next) {
        res.send("Mostramos el form para agregar una marca")
    },

    store: function (datos,cb) {
        Marca.create(datos, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    update: function (datos, cb) {
        Marca.update(datos, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    show: function (id, cb) {
        Marca.findOne(id, function (err, result) {
            if(err) return cb(err, null)
            return cb(null, result)
        })
    },

    destroy: function (id, cb) {
        Marca.delete(id, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    getBySlug: function (req, res, next) {
        Marca.findBySlug(req.params.slug, function (err, row) {
            res.send(row)
        })
    },

    getByName: function (req, res, next) {
        Marca.findByName(req.params.name, function (err, row) {
            res.send(row)
        })
    },


}