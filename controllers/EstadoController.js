
const Estado = require("../models/Estado")

module.exports = {

    index: function (cb) {
        Estado.all(function (err, rows) {
            if (err) {
                cb(err, null)
            }
            //
            //console.log(rows)
            console.log("prueba index EstadoController")
            cb(null, rows)
        })
    },

    create: function (req, res, next) {
        res.send("Mostramos el form para agregar una Estado")
    },

    store: function (datos,cb) {
        Estado.create(datos, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    update: function (datos, cb) {
        Estado.update(datos, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    show: function (req, res, next) {
        Estado.findOne(req.params.id, function (err, result) {
            res.send(result)
        })
    },

    destroy: function (id, cb) {
        Estado.delete(id, function (err, result) {
            //console.log(id)
            if (err) {
                cb(err, null)
            } else {
                cb(null, result)
            }

        })
    },

    getBySlug: function (req, res, next) {
        Estado.findBySlug(req.params.slug, function (err, row) {
            res.send(row)
        })
    },

    getByName: function (req, res, next) {
        Estado.findByName(req.params.name, function (err, row) {
            res.send(row)
        })
    },

}