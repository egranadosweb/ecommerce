
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

    



}