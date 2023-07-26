const isAuthenticated = function(req,res,next){

    if(!req.isAuthenticated()){
        console.log("Middleware isAuthenticated : El usuario no está autenticado")
        res.redirect("/login")
    }else{
        console.log("Middleware isAuthenticated : El usuario está autenticado")
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