
const db = require("../config/db")

module.exports = {

    all : function(callback){
        db.query("select * from categoria", callback)
    },

    create : function(data, callback){
        db.query("insert into categoria set ?",[data], callback)
    },

    update : function(datos, callback){
        db.query("update categoria set ? where id = ?",[datos, datos.id], callback)
    },

    delete : function(id, callback){
        db.query("delete from categoria where id = ?",[id], callback)
    },

    findOne : function(id, callback){
        db.query("select * from categoria where id = ?",[id], callback)
    },
    
    findByName : function(nombre, callback){
        db.query("select * from categoria where nombre = ?",[nombre], callback)
    },

    findBySlug : function(slug, callback){
        db.query("select * from categoria where slug = ?",[slug], callback)
    },


}