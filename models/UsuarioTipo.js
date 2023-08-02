
const con = require("../config/db")

module.exports = {
    all(cb){
        con.query("SELECT * FROM UsuarioTipo", (err, rows) => {
            if(err) return cb(err)
            return cb(null, rows)
        })
    }
}