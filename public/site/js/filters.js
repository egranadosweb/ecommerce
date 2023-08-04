
window.addEventListener("DOMContentLoaded", (e) => {
    const screenDesktop = 949
    //console.log(screenDesktop)
    if (window.innerWidth <= screenDesktop) {
        try {
            const filterDesktopNode = document.querySelector(".products__filters__desktop").remove()

            var btnFilter = document.querySelector(".products__filter__btn")
            var filterDrawer = document.querySelector(".products__filters__drawer")
            var filterBg = document.querySelector(".products__filters__bg")

            function mostrarModalFiltros(){
                filterDrawer.parentNode.style.zIndex = "99"
                filterDrawer.classList.add("products__filters__drawer--in")
                filterBg.classList.add("products__filters__bg--in")
                document.body.classList.add("stop-scrolling")
            }

            function esconderModalFiltros() {
                filterDrawer.parentNode.style.zIndex = "49"
                filterDrawer.classList.remove("products__filters__drawer--in")
                filterBg.classList.remove("products__filters__bg--in")
                document.body.classList.remove("stop-scrolling")
            }

            btnFilter.addEventListener("click", e => {
                mostrarModalFiltros()
                filterBg.addEventListener("click", e => {
                    esconderModalFiltros()
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    if (window.innerWidth > screenDesktop) {
        try {
            const filtersMovilNode = document.querySelector(".products__filters__movil").remove()
        } catch (error) {
            console.log(error)
        }
    }

    //capturamos los productos, hacemos un clon de ellos y capturamos su contenedor
    const productosWrapper = document.querySelector(".products__cards__wrapper")
    let productos = document.querySelectorAll(".products__card")
    const productosClonados = [...productos].map(e => e)
    const productosEncontradosLabel = document.querySelector(".productos__encontrados")
    productosEncontradosLabel.innerHTML = productos.length

    //datos dataset para filtrar
    const filtros = {}

    const extraerFiltros = () => {
        const marcasRaw = []
        const categoriasRaw = []
        productosClonados.forEach((item,index) => {
            //console.log(item.dataset)
            marcasRaw.push(item.dataset.marca)
            categoriasRaw.push(item.dataset.categoria)
        })

        filtros.marcas = [... new Set(marcasRaw)]
        filtros.categorias = [... new Set(categoriasRaw)]
    }

    const crearFiltro = (objetoFiltros) => {
        const productsFilterWrapper = document.querySelector(".products__filters__wrapper")
        const btn = productsFilterWrapper.lastChild
        Object.keys(objetoFiltros).forEach((key) => {
            // console.log(`${key} - ${objetoFiltros[key]}`)
            const productsFilterDiv = document.createElement("div")
            productsFilterDiv.className = "products__filter"
            const productsFilterName = document.createElement("p")
            productsFilterName.className = "products__filter__name"
            productsFilterName.textContent = String(key)
            productsFilterDiv.appendChild(productsFilterName)//creamos el div del filtro y le agregamos el P del nombre del filtro

            objetoFiltros[key].forEach((item,index) => {
                // console.log(`item de filtro = ${item}`)
                const productsFilterGroup = document.createElement("div")
                const productsFilterCheckbox = document.createElement("input")
                const productsFilterLabel = document.createElement("label")
                productsFilterGroup.className = "products__filter__group"
                productsFilterCheckbox.className = "products__filters__input-checkbox"
                productsFilterLabel.className = "products__filters__label"
                productsFilterCheckbox.type = "checkbox"
                productsFilterCheckbox.value = String(item)
                productsFilterCheckbox.name = String(key)
                productsFilterLabel.textContent = String(item)
                productsFilterGroup.appendChild(productsFilterCheckbox)
                productsFilterGroup.appendChild(productsFilterLabel)
                productsFilterDiv.appendChild(productsFilterGroup)
            })
            productsFilterWrapper.insertBefore(productsFilterDiv,btn)
        })
    }

    extraerFiltros()

    crearFiltro(filtros)


    const newInputCheck = document.createElement(`input`)
    newInputCheck.type = "checkbox"
    newInputCheck.className = "products__filters__input-checkbox"


    const filterActionBtn = document.querySelector(".products__filter__action__btn")
    const filterRange = document.querySelector("#filterPrice")
    const filterRangeLabel = filterRange.previousSibling;
    filterRangeLabel.innerHTML = filterRange.value

    filterRange.addEventListener("input", e => {
        filterRangeLabel.innerHTML = Number(filterRange.value).toLocaleString("es-CO")
    })


    productos.forEach(e => {
        e.classList.add("opacity--on")
    })

    let productosFiltrados = []
    let productosDisabled = []

    filterActionBtn.addEventListener("click", e => {
        try {
            if (filterDrawer) {
                esconderModalFiltros()
            }

            productosFiltrados = []
            productosDisabled = []
            productos.forEach((producto) => {
                if ( Number(producto.dataset.precio) <= Number(filterRange.value)) {
                    producto.classList.remove("opacity--on")
                    productosFiltrados.push(producto)
                } else {
                    productosDisabled.push(producto)
                }
            })
            
            const getInputsChecked = (x) =>{
                const inputsChecked = []
                x.forEach((item, index) => {
                    if(item.checked){
                        inputsChecked.push(item)
                    }
                })
                return inputsChecked
            }

            const inputsMarcasChecked = getInputsChecked(document.querySelectorAll(`[name="marcas"]`))
            const inputsCategoriasChecked = getInputsChecked(document.querySelectorAll(`[name="categorias"]`))
            const temp = productosFiltrados.filter(producto => {
                if(producto.dataset.marca == "epson"){
                    return producto
                }
            })
            console.log(temp)
            // if(inputsMarcasChecked.length != 0){
                
            // }

            //console.log(productosFiltrados)
            // if(inputsCategoriasChecked.length != 0){
                
            // }

            productosFiltrados.sort((a,b) => Number(a.dataset.precio) - Number(b.dataset.precio))
            productosWrapper.replaceChildren(...productosFiltrados)

            setTimeout(() => {
                if(productosWrapper.childNodes.length == 0){
                    productosWrapper.textContent = "No hubo ninguna coincidencia..."
                }else{
                    productosEncontradosLabel.innerHTML = productosWrapper.childNodes.length
                    productos.forEach(e => {
                        e.classList.add("opacity--on")
                    })
                }
            }, 100)

        } catch (error) {
            console.log(error)
        }

    })

})
