const isAuthenticated = function(req,res,next){
    if(!req.isAuthenticated()){
        console.log("El usuario no está autenticado")
        res.redirect("/login")
    }else{
        return next()
    }
    
}

const crearSlug = (string) => {
    var string = string.split(" ").join("-")
    return string
}




module.exports = {
    crearSlug,
    isAuthenticated
}