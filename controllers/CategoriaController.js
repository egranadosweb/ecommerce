
const Categoria = require("../models/Categoria")

module.exports = {

    index : function(req,res,next){
        Categoria.all(function(err, rows){
            res.send(rows)
        })
    },

    create : function(req,res,next){
        res.send("Mostramos el form para agregar una categoria")
    },

    store : function(req,res,next){
        Categoria.create(req.body, function(err, result){
            send.res(result)
        })
    },

    show : function(req,res,next){
        Categoria.findOne(req.params.id , function(err, result){
            res.send(result)
        })
    },

    delete : function(req,res,next){
        Categoria.destroy(req.params.id , function(err, result){
            res.send(result)
        })
    },

    getBySlug : function(req,res,next){
        Categoria.findBySlug(req.params.slug, function(err, row){
            res.send(row)
        })
    },

    getByName : function(req,res,next){
        Categoria.findByName(req.params.name , function(err, row){
            res.send(row)
        })
    },

}