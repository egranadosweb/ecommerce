
window.addEventListener("DOMContentLoaded", (e) => {

    console.log("Inicio el archivo principal de javascript")

    //variables que controlan la activacion de bloques de codigo
    const formEliminarProducto = document.querySelectorAll(".formEliminarProducto")
    const inputsViews = document.querySelectorAll(".input__view") || null
    const avatarLogo = document.querySelector(".content__avatar__logo") || null
    const formCrearProducto = document.querySelector("#form_crear_producto")

    // if(formCrearProducto){
    //     formCrearProducto.addEventListener("sumit", function(e){
    //         e.preventDefault()
            
    //     })
    // }

    if(document.querySelector("form")){
        document.querySelectorAll("form").forEach((item, index) => {
            item.reset()
            console.log(item)
        })
    }
    
    if(avatarLogo){
        avatarLogo.addEventListener("click", function(e) {
            console.log(this.lastChild)
            this.lastChild.classList.toggle("content__avatar__submenu--show")
        })
    }

    if (formEliminarProducto) {
        formEliminarProducto.forEach((item, index) => {
            item.addEventListener("submit", (e) => {
                e.preventDefault()
                console.log("Esta seguro de eliminar este producto")
                if (confirm("Esta seguro de eliminar este producto?")) {
                    item.submit()
                } else {

                }
            })
        })

    }

    if(inputsViews){
        console.log("Existe bloques para previsualizar imagenes")
        const inputViewEle = document.querySelector(".input__view")

        const inputViewsEle = document.querySelectorAll(".input__view")

        inputViewsEle.forEach((item, index) => {
            item.style.height = `${window.getComputedStyle(inputViewEle).width}`
        })
        
        
        const inputFilesImg1Ele = document.querySelectorAll(".input__file__img")

        inputFilesImg1Ele.forEach((item, index) => {
            item.addEventListener("change", function(e){
                const name = item.name
                document.querySelector(`img[name="${name}"]`).src = URL.createObjectURL(this.files[0])
                console.log(item.value)
            })
        })
        
        


    }






})
