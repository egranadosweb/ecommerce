
const con = require("../config/db")

module.exports = {

    all : function(callback){
        const sql = "select producto.id, producto.nombre, producto.descripcion, producto.slug, producto.precio, marca.nombre as marca, categoria.nombre as categoria, productoestado.estado as estado from producto inner join categoria on categoria.id = producto.Categoria_id inner join marca on marca.id = producto.Marca_id inner join productoestado on productoestado.id = producto.ProductoEstado_id"
        con.query(sql, callback)
    },

    create : function(datos, callback){
        con.query(`insert into producto set ?`,[datos], callback)
    },

    findOne : function(id, callback){
        const sql = `select * from producto where id = "${id}"`
        con.query(sql, callback)
    },

    destroy : function(id, callback){
        const sql = `delete from producto where id = ${id}`
        con.query(sql, callback)
    },

    findProductBySlug : function(slug, callback){
        con.query("select * from producto where slug = ?",[slug], callback)
    },

    findProductByCategory : function(category, callback){
        con.query("select producto.nombre, producto.descripcion from producto inner join categoria on categoria.id = producto.categoria_id where categoria.slug = ?",[category], callback)
    },

    findProductByMarca : function(marca, callback){
        con.query("select producto.nombre, producto.descripcion from producto inner join marca on marca.id = producto.marca_id where marca.slug = ?",[marca], callback)
    },



}