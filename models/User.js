
const con = require("../config/db")

module.exports = {

    all : function(callback){
        const sql = "select * from user"
        con.query(sql,callback)
    }
    ,

    create(datos, cb){
        con.query("INSERT INTO user SET ?", [datos], (err, result) => {
            if(err) return cb(err)
            return cb(null, result)
        })
    },

    getUsuarioPorNombre(username, cb){
        con.query("SELECT * FROM USER WHERE username = ?", [username], (err, row) => {
            if(err) return cb(err)
            return cb(null, row)
        })
    },

    findOne : function(id, callback){
        const sql = `select * from reader user id = ${id}`
        con.query(sql,callback)
    }
    ,

    update : function(id, callback){
        
    }
    ,

    delete : function(id, callback){
        con.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
            if(err) return callback(err, null)
            return callback(null, result)
        })
    }
    ,
}