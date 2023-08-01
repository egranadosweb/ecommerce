
const db = require("../config/db")

module.exports = {

    all : function(callback){
        db.query("select * from productoEstado", callback)
    },

    create : function(data, callback){
        db.query("insert into productoEstado set ?",[data], callback)
    },

    update : function(datos, callback){
        db.query("update productoEstado set ? where id = ?",[datos, datos.id], callback)
    },

    delete : function(id, callback){
        db.query("delete from productoEstado where id = ?",[id], callback)
    },

    findOne : function(id, callback){
        db.query("select * from productoEstado where id = ?",[id], callback)
    },
    
    findByName : function(nombre, callback){
        db.query("select * from productoEstado where nombre = ?",[nombre], callback)
    },


}