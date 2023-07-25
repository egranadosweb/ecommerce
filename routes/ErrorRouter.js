
const express = require("express")
const router = express.Router()


router.get("/*", function(req,res,next) {
    console.log("Ruta inexistente")
    res.send("Ruta inexistente")
})

module.exports = router