
const express = require("express")
const router = express.Router()


router.get("/*", function(req,res,next) {
    console.log("ErrorRouter : Ruta inexistente")
    res.send("ErrorRouter : Ruta inexistente")
})

module.exports = router