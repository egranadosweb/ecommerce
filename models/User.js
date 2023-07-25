

const con = require("../config/db")

module.exports = {

    all : function(callback){
        const sql = "select * from reader"
        con.query(sql,callback)
    }
    ,

    findOne : function(id, callback){
        const sql = `select * from reader where id = ${id}`
        con.query(sql,callback)
    }
    ,

    create : function(data, callback){
        const sql = `insert into reader (email, name, type) values (${data[email]}, ${data[name]} , ${data[type]})`
        con.query(sql,callback)
    }
    ,

    update : function(id, callback){
        
    }
    ,

    destroy : function(id, callback){
        
    }
    ,
}