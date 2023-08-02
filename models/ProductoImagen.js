
const db = require("../config/db")
const {isObjectEmpty} = require("../utils/utils.functions")

module.exports = {

    imagenesDeProducto(idProducto, callback){
        db.query("SELECT * FROM productoImagenes where Producto_id = ?", [idProducto], (err, rows) => {
            if(err){
                return callback(err, null)
            }
            if(rows.length === 0){
                return callback(null, false)
            }else{
                return callback(null, rows)
            }
        })
    },

    update(productoId, datos, orden, cb){
        db.query("UPDATE productoImagenes SET ? WHERE Producto_id = ? AND orden = ?",[datos, productoId, orden] , (err, result) => {
            if(err) return cb(err, null)
            return cb(null, result)
        })
    },

    create(datos, cb){
        db.query("INSERT INTO productoImagenes SET ?", [datos], (err, result) => {
            if(err) return cb(err, null)
            return cb(null, result)
        })
    },



}