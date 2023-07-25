const User = require("../models/User")

module.exports = {

    login : function(req,res){
        User.getAll((err, rows) => {
            if(err) throw err

            res.send(rows)
        })
    },

    register : function(req,res){
        res.send("Ruta registrar")
    },

    logout : function(req,res){
        res.send("log out")
    }
}