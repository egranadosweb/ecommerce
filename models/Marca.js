

const db = require("../config/db")

module.exports = {

    all : function(callback){
        db.query("select * from marca", callback)
    },

    create : function(data, callback){
        db.query("insert into marca set ?",[data], callback)
    },

    update : function(datos, callback){
        db.query("update marca set ? where id = ?",[datos, datos.id], callback)
    },

    delete : function(id, callback){
        db.query("delete from marca where id = ?",[id], callback)
    },

    findOne : function(id, callback){
        db.query("select * from marca where id = ?",[id], callback)
    },
    
    findByName : function(nombre, callback){
        db.query("select * from marca where nombre = ?",[nombre], callback)
    },

    findBySlug : function(slug, callback){
        db.query("select * from marca where slug = ?",[slug], callback)
    },


}