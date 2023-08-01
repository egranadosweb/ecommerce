
window.addEventListener("DOMContentLoaded", (e) => {

    console.log("Inicio el archivo principal de javascript")

    //variables que controlan la activacion de bloques de codigo
    const formEliminarProducto = document.querySelectorAll(".formEliminarProducto")
    const inputsViews = document.querySelectorAll(".input__view") || null
    const avatarLogo = document.querySelector(".content__avatar__logo") || null
    const formCrearProducto = document.querySelector("#form_crear_producto")

    const eliminarCategoriaBtn = document.querySelectorAll(".eliminar_categoria") || null
    const editarCategoriaBtn = document.querySelectorAll(".editar_categoria") || null
    const btnShowAddCategoria = document.querySelector("#btn__show__addcategorias") || null

    const eliminarMarcaBtn = document.querySelectorAll(".eliminar_marca") || null
    const editarMarcaBtn = document.querySelectorAll(".editar_marca") || null

    const btnShowAddSection = document.querySelector("#btn__show__form__add") || null
    const formEditarProducto = document.querySelector("#form_editar_producto") || null

    //Detectar cambios en el formulario de edicion de productos y activamos o deshabilitamos el boton para enviar el form
    if(formEditarProducto){
        console.log("Detectar cambios en los campos")
        const btnSendForm = formEditarProducto.querySelector("button")
        const elementosForm  = formEditarProducto.querySelectorAll("input, textarea, select")
        formEditarProducto.addEventListener("input" , (e) => {
            if(e.target.value !== e.target.dataset.oldValue){
                e.target.dataset.changed = "1"
                btnSendForm.removeAttribute("disabled")
            }else{
                e.target.dataset.changed = "0"
                const isChanged = false
                elementosForm.forEach((item, index) => {
                    if(item.dataset.changed == "1"){
                        isChanged = true
                        return
                    }
                })
                if(!isChanged){
                    btnSendForm.setAttribute("disabled","")
                }
            }  
        })


        btnSendForm.addEventListener("click" , (e) => {
            e.preventDefault()
            elementosForm.forEach((item) => {
                if(!item.dataset.changed){
                    item.setAttribute("disabled","")
                    console.log(item)
                }
            })
            console.log(elementosForm)
            console.log("click")
            formEditarProducto.submit()
        })

    }

    if(btnShowAddSection){
        const formAddSection = document.querySelector(".form__add__wrapper")
        console.log(formAddSection)
        btnShowAddSection.addEventListener("click", (e) => {
            formAddSection.classList.toggle("hidden")
        })
    }

    if (editarMarcaBtn) {
        console.log("Editar categoria")
        editarMarcaBtn.forEach(item => {
            item.addEventListener("click", async (e) => {
                const fila = e.currentTarget.parentElement.parentElement.parentElement
                const id = fila.querySelector(".marca-id")
                const nombre = fila.querySelector(".marca-nombre")
                const slug = fila.querySelector(".marca-slug")
                console.log(id.value)

                const changes = {
                    "id": id.value,
                    "nombre": nombre.value,
                    "slug": slug.value
                }
                console.log(changes)
                const reqFetch = await fetch(`/dashboard/producto/marcas/${id.value}/editar`, {
                    method: "POST",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(changes)
                })

                if(reqFetch.ok){
                    const res = await reqFetch.json()
                    if(res.err){
                        if(res.err.errno){
                            alert("Ya existe un registro con datos similares, por favor revise los datos ingresados, no se aceptan registros duplicados")
                            window.location.reload()
                            return console.log("Ya existe una fila con ese id")
                        }
                        alert("Hubo un error al momento de la actualización, intentelo de nuevo.")
                        window.location.reload()
                        return
                    }
                    console.log("Peticion para editar exitosa")
                    console.log(res)
                    window.location.reload()
                    alert("Actualización del registro exitosa.")
                }else{
                    console.log("La peticion para editar fue infructuosa")
                }
            })
        })
    }

    if (eliminarMarcaBtn) {
        console.log("Eliminar Marca")
        eliminarMarcaBtn.forEach(item => {
            item.addEventListener("click", async (e) => {
                const id = e.currentTarget.dataset.id

                if (confirm("Esta seguro de eliminar esta marca?")) {
                    const reqFetch = await fetch(`/dashboard/producto/marcas/${id}/eliminar`, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                            //'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: "follow", // manual, *follow, error
                        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({ "id": id }), // body data type must match "Content-Type" header
                    })
                    const res = await reqFetch.json()
                    if (reqFetch.ok) {
                        // e.target.parentElement.parentElement.remove()
                        window.location.reload()
                        console.log(res.msg)
                    }

                } else {
                    console.log("Peticion para eliminar marca infructuosa")
                }
            })
        })

    }











    if(btnShowAddCategoria){
        const formAddCategoria = document.querySelector(".categorias__add__form")
        console.log(formAddCategoria)
        btnShowAddCategoria.addEventListener("click", (e) => {
            formAddCategoria.classList.toggle("hidden")
        })
    }

    if (editarCategoriaBtn) {
        console.log("Editar categoria")
        editarCategoriaBtn.forEach(item => {
            item.addEventListener("click", async (e) => {
                const fila = e.currentTarget.parentElement.parentElement.parentElement
                const categoriaId = fila.querySelector(".categoria-id")
                const categoriaNombre = fila.querySelector(".categoria-nombre")
                const categoriaDescripcion = fila.querySelector(".categoria-descripcion")
                const categoriaSlug = fila.querySelector(".categoria-slug")
                console.log(categoriaId.value)
                const changes = {
                    "id": categoriaId.value,
                    "nombre": categoriaNombre.value,
                    "descripcion": categoriaDescripcion.value,
                    "slug": categoriaSlug.value
                }
                console.log(changes)
                const reqFetch = await fetch(`/dashboard/producto/categorias/${categoriaId.value}/editar`, {
                    method: "POST",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(changes)
                })

                if(reqFetch.ok){
                    const res = await reqFetch.json()
                    if(res.err){
                        if(res.err.errno){
                            alert("Ya existe un registro con dato similares, por favor revise los datos ingresados, no se aceptan registros duplicados")
                            window.location.reload()
                            return console.log("Ya existe una fila con ese id")
                        }
                        alert("Hubo un error al momento de la actualización, intentelo de nuevo.")
                        window.location.reload()
                        return
                    }
                    console.log("Peticion para editar exitosa")
                    console.log(res)
                    window.location.reload()
                    alert("Actualización del registro exitosa.")
                }else{
                    console.log("La peticion para editar fue infructuosa")
                }
            })
        })
    }

    if (eliminarCategoriaBtn) {
        console.log("Eliminar categoria")
        eliminarCategoriaBtn.forEach(item => {
            item.addEventListener("click", async (e) => {
                const id = e.currentTarget.dataset.id

                if (confirm("Esta seguro de eliminar esta categoria?")) {
                    const reqFetch = await fetch(`/dashboard/producto/categorias/${id}/eliminar`, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                            //'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: "follow", // manual, *follow, error
                        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({ "id": id }), // body data type must match "Content-Type" header
                    })
                    const res = await reqFetch.json()
                    if (reqFetch.ok) {
                        // e.target.parentElement.parentElement.remove()
                        window.location.reload()
                        console.log(res.msg)
                    }

                } else {
                    console.log("Peticion para eliminar categoria infructuosa")
                }
            })
        })

    }

    if (document.querySelector("form")) {
        document.querySelectorAll("form").forEach((item, index) => {
            item.reset()
            console.log(item)
        })
    }

    if (avatarLogo) {
        avatarLogo.addEventListener("click", function (e) {
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
    
    if (inputsViews) {
        console.log("Existe bloques para previsualizar imagenes")
        const inputViewEle = document.querySelector(".input__view")

        const inputViewsEle = document.querySelectorAll(".input__view")

        inputViewsEle.forEach((item, index) => {
            item.style.height = `${window.getComputedStyle(inputViewEle).width}`
        })


        const inputFilesImg1Ele = document.querySelectorAll(".input__file__img")

        inputFilesImg1Ele.forEach((item, index) => {
            item.addEventListener("change", function (e) {
                const name = item.name
                document.querySelector(`img[name="${name}"]`).src = URL.createObjectURL(this.files[0])
                console.log(item.value)
            })
        })




    }






})
