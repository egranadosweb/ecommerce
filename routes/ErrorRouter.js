
const express = require("express")
const router = express.Router()


router.get("/*", function(req,res,next) {
    console.log("ErrorRouter : Ruta inexistente")
    res.status(404).send("ErrorRouter : Ruta o recurso inexistente.")
})

module.exports = router