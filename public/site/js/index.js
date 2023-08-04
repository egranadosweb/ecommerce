
addEventListener("DOMContentLoaded", (e) => {
    var screenDesktop = 949

    const addCartItem = () => {
        try {
            //creamos los nodos con los campos que contienen los datos del producto
            const nombreProductoNode = document.querySelector("#nombre__producto").textContent
            const marcaProductoNode = document.querySelector("#marca__producto").childNodes[1].textContent
            const referenciaProductoNode = document.querySelector("#referencia__producto").childNodes[1].textContent
            const precioProductoNode = document.querySelector(".product__price").textContent
            const imgProductoNode = document.querySelector(".product__img__carrito").src
            const cantidadProductoNode = Number(document.querySelector("#cantidad__producto").textContent)
            let existe = false
            const carritoEnLocalStorage = JSON.parse(window.localStorage.getItem("carrito"))

            //creamos un objeto que contiene los datos del producto que vamos agregar o actualizar
            const nuevoItemCart =
            {
                referenciaProductoNode,
                nombreProductoNode,
                marcaProductoNode,
                precioProductoNode,
                cantidadProductoNode,
                imgProductoNode
            }

            //Validamos si existe la variable carrito en el LC y si no es asi, la creamos por primera vez
            if (!carritoEnLocalStorage) {
                window.localStorage.setItem("carrito", JSON.stringify([nuevoItemCart]))
                console.log("Se creó la variable carrito por primera vez en local storage")
                return
            }

            //Si ya existe la variable carrito en el LC, entonces la iteramos para validar si ya contiene un producto con la misma referencia, y si es asi solo actualizamos su cantidad en el carrito creado temporalmente y cambiamos el valor de la variable de control existe a True
            carritoEnLocalStorage.forEach((item, index) => {
                if (item.referenciaProductoNode === nuevoItemCart.referenciaProductoNode) {
                    console.log("Ya existe un item en el carrito con la misma referencia, se acutalizará con la nueva cantidad")
                    item.cantidadProductoNode = nuevoItemCart.cantidadProductoNode
                    existe = true
                    return
                }
            })

            if (!existe) { //SI NO EXISTE LA REFERENCIA EN EL CARRITO ENTONCES AGREGAMOS UN NUEVO OBJETO AL LOCAL STORAGE
                carritoEnLocalStorage.push(nuevoItemCart)
                window.localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage))
                console.log("Agregó un nuevo item al carrito")
            } else {
                window.localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage))
                console.log("Actualizó un item del carrito")
            }
        } catch (error) {
            console.log("Hubo un error :")
            console.log(error)
        }
    }

    const delCartItem = (e) => {
        if (window.confirm("¿Esta seguro de eliminar este item del carrito?")) {
            const refToDel = e.target.parentNode.dataset.ref
            const cartItems = JSON.parse(window.localStorage.getItem("carrito"))
            const newCartItems = cartItems.filter(item => item.referenciaProductoNode !== refToDel)
            window.localStorage.setItem("carrito", JSON.stringify(newCartItems))
            renderizarCarrito()
        }
    }

    const renderizarCarrito = () => {
        try {
            const itemDiv = document.createElement("div")
            const codeDiv = document.createElement("div")
            const nameDiv = document.createElement("div")
            const refDiv = document.createElement("div")
            const priceDiv = document.createElement("div")
            const subtotalDiv = document.createElement("div")
            const amountDiv = document.createElement("div")
            const imgDiv = document.createElement("div")
            const imgEle = document.createElement("img")
            const delBtn = document.createElement("span")
            const itemFragment = document.createDocumentFragment()
            const carritoEnLocalStorage = JSON.parse(window.localStorage.getItem("carrito"))

            itemDiv.classList.add("carrito__item")
            codeDiv.classList.add("carrito__item__field", "carrito__item__code")
            nameDiv.classList.add("carrito__item__field", "carrito__item__name")
            refDiv.classList.add("carrito__item__field", "carrito__item__ref")
            amountDiv.classList.add("carrito__item__field", "carrito__item__amount")
            imgDiv.classList.add("carrito__item__field", "carrito__item__img")
            priceDiv.classList.add("carrito__item__field", "carrito__item__price")
            subtotalDiv.classList.add("carrito__item__field", "carrito__item__subtotal")
            delBtn.classList.add("carrito__item__del")
            delBtn.textContent = "X"

            //SELECCIONAMOS EL CARRITO CONTAINER, EL NODO DEL SUBTOTAL, DEL SHIPPING COST Y DEL TOTAL SEGUN EL TAMAÑO DEL VIEWPORT
            let carritoContainer = carritoSubtotalNode = carritoShippingNode = carritoTotalNode = null
            carritoContainer = document.querySelector(".carrito__container")
            carritoSubtotalNode = document.querySelector(".carrito__subtotal")
            carritoShippingNode = document.querySelector(".carrito__shipping")
            carritoTotalNode = document.querySelector(".carrito__total")

            let formatedPrice = null
            let subtotalItem = 0
            let shippingCost = 0
            let total = 0

            if (carritoEnLocalStorage) {
                carritoEnLocalStorage.forEach((item, index) => {

                    nameDiv.innerHTML = item.nombreProductoNode
                    refDiv.innerHTML = item.referenciaProductoNode
                    amountDiv.innerHTML = item.cantidadProductoNode
                    imgEle.src = item.imgProductoNode
                    imgDiv.replaceChildren(imgEle)

                    formatedPrice = Number(item.precioProductoNode).toLocaleString("es-CO")
                    priceDiv.innerHTML = formatedPrice

                    subtotalItem = item.cantidadProductoNode * item.precioProductoNode
                    subtotalDiv.innerHTML = subtotalItem.toLocaleString("es-CO")
                    total += subtotalItem

                    itemDiv.replaceChildren(imgDiv, nameDiv, refDiv, amountDiv, priceDiv, subtotalDiv, delBtn)
                    itemDiv.dataset.ref = item.referenciaProductoNode
                    itemFragment.append(itemDiv.cloneNode(true))

                })
            }

            //agregamos la notificacion al icono del carrito
            const carritoNotificacion = document.createElement("div")
            const spanCarritoNotificacion = document.createElement("span")
            spanCarritoNotificacion.innerHTML = carritoEnLocalStorage.length
            carritoNotificacion.classList.add("carrito__notificacion")
            carritoNotificacion.append(spanCarritoNotificacion)
            if (btnShowCarrito) {
                btnShowCarrito.parentElement.append(carritoNotificacion)
            }

            carritoContainer.replaceChildren(itemFragment)

            carritoSubtotalNode.innerHTML = total.toLocaleString("es-CO")
            carritoShippingNode.innerHTML = shippingCost.toLocaleString("es-CO")
            carritoTotalNode.innerHTML = (total + shippingCost).toLocaleString("es-CO")

            //creamos el manejador de eventos para todos los botones para eliminar cada item despues de haber renderizados todos los items
            const btnsDel = document.querySelectorAll(".carrito__item__del")
            btnsDel.forEach((item, index) => {
                item.addEventListener("click", delCartItem)
            })

            console.log("Se rendereizó el carrito")

        } catch (error) {
            console.log("Hubo un error en la renderizacion del carrito")
            console.log(error)
        }
    }

    //CONFIGURACIONES PARA TAMAÑO MOVIL HASTA LOS 949 PX
    if (window.innerWidth <= screenDesktop) {
        try {
            //removemos nodos del viewport desktop
            document.querySelector(".carrito-lateral") ? document.querySelector(".carrito-lateral").remove() : null
            document.querySelector(".carrito-lateral__background") ? document.querySelector(".carrito-lateral__background").remove() : null
            document.querySelector(".header__nav__desktop") ? document.querySelector(".header__nav__desktop").remove() : null
            document.querySelector(".header__cta__desktop") ? document.querySelector(".header__cta__desktop").remove() : null

            document.querySelector(".btn__show__carrito").dataset.menu = "1"

            const cartModal = document.querySelector(".carrito-modal")
            const btnCloseCartModal = document.querySelector(".carrito-modal__btn-close")
            btnCloseCartModal.addEventListener("click", (e) => {
                cartModal.classList.remove("carrito-modal--translate-in")
                document.body.classList.remove("stop-scrolling")
            })

            var btnShowCarrito = document.querySelector(".btn__show__carrito")
            btnShowCarrito.addEventListener("click", (e) => {
                e.preventDefault()
                if (e.currentTarget.dataset.menu === "1") {
                    console.log("click boton modal")
                    cartModal.classList.add("carrito-modal--translate-in")
                    document.body.classList.add("stop-scrolling")
                }
                if (e.currentTarget.dataset.menu === "2") {
                    cartLateral.classList.add("carrito-lateral--translate-in")
                    cartLateralBackground.classList.add("carrito-lateral__background--in")
                    document.body.classList.add("stop-scrolling")
                }
            })
            //MENU MOVIL
            const menuMovil = document.querySelector("#menuMovil")
            const menuMovilIcon = document.querySelector("#menuMovilIcon")
            const menuMovilCloseBtn = document.querySelector("#header__nav__btn__close")
            const submenuCaptions = document.querySelectorAll(".header__submenu__caption")

            const showSubmenu = (e) => {
                e.preventDefault()
                const subMenu = e.target.nextSibling
                const subMenuH = subMenu.scrollHeight
                const subMenuClassList = subMenu.classList
                if (subMenuClassList.contains("submenu--active")) {
                    console.log("contiene la clase")
                    subMenu.style.height = "0"
                    subMenu.classList.remove("submenu--active")
                    return
                }
                subMenu.style.height = `${subMenuH}px`
                subMenu.classList.add("submenu--active")
            }

            submenuCaptions.forEach((item, index) => {
                item.addEventListener("click", showSubmenu)
            })

            menuMovilIcon.addEventListener("click", (e) => {
                menuMovil.classList.toggle("header__nav--in")
                document.body.classList.toggle("stop-scrolling")
            })

            menuMovilCloseBtn.addEventListener("click", (e) => {
                e.preventDefault()
                menuMovil.classList.toggle("header__nav--in")
                document.body.classList.toggle("stop-scrolling")
            })

        } catch (error) {
            console.log(error)
        }
    }

    //CONFIGURACIONES PARA TAMAÑO DESKTOP A PRTIR DE LOS 950 PX
    if (window.innerWidth > 949) {
        try {
            //removemos nodos del viewport movil
            document.querySelector(".header__movil") ? document.querySelector(".header__movil").remove() : null
            document.querySelector(".carrito-modal") ? document.querySelector(".carrito-modal").remove() : null
            document.querySelector(".header__drawer") ? document.querySelector(".header__drawer").remove() : null
            document.querySelector(".header__menumovil__group__icon") ? document.querySelector(".header__menumovil__group__icon").remove() : null

            document.querySelector(".btn__show__carrito").dataset.menu = "2"

            const cartLateral = document.querySelector(".carrito-lateral")
            const cartLateralBackground = document.querySelector(".carrito-lateral__background")
            const btnCloseCartLateral = document.querySelector(".carrito-lateral__btn-close")
            cartLateralBackground.addEventListener("click", (e) => {
                cartLateral.classList.remove("carrito-lateral--translate-in")
                cartLateralBackground.classList.remove("carrito-lateral__background--in")
                document.body.classList.remove("stop-scrolling")
            })

            btnCloseCartLateral.addEventListener("click", (e) => {
                cartLateral.classList.remove("carrito-lateral--translate-in")
                cartLateralBackground.classList.remove("carrito-lateral__background--in")
                document.body.classList.remove("stop-scrolling")
            })

            window.addEventListener("keyup", (e) => {
                if (e.key === "Escape") {
                    cartLateral.classList.remove("carrito-lateral--translate-in")
                    cartLateralBackground.classList.remove("carrito-lateral__background--in")
                    document.body.classList.remove("stop-scrolling")
                    console.log("prueba evento carro lateral")
                }
            })

            const btnShowCarrito = document.querySelector(".btn__show__carrito")
            console.log(btnShowCarrito)
            btnShowCarrito.addEventListener("click", (e) => {
                e.preventDefault()
                if (e.currentTarget.dataset.menu === "1") {
                    console.log("click boton modal")
                    cartModal.classList.add("carrito-modal--translate-in")
                    document.body.classList.add("stop-scrolling")
                }
                if (e.currentTarget.dataset.menu === "2") {
                    cartLateral.classList.add("carrito-lateral--translate-in")
                    cartLateralBackground.classList.add("carrito-lateral__background--in")
                    document.body.classList.add("stop-scrolling")
                }
            })

            const linkWithSubmenu = document.querySelectorAll(".header__nav__desktop__li--with-submenu") || null

            if (linkWithSubmenu != null && linkWithSubmenu.length > 0) {
                const alturaMenu = document.querySelector(".header__nav__desktop__li").scrollHeight
                linkWithSubmenu.forEach((item, index) => {
                    item.querySelector("nav").style.transform = `translateY(${alturaMenu}px)`
                    item.addEventListener("mouseover", (e) => {
                        const target = e.currentTarget.querySelector(".header__nav__desktop__submenu")
                        target.style.visibility = "visible"
                        target.style.opacity = "1"
                    })
                    item.addEventListener("mouseout", (e) => {
                        const target = e.currentTarget.querySelector(".header__nav__desktop__submenu")
                        target.style.visibility = "hidden"
                        target.style.opacity = "0"
                    })
                })
            }


        } catch (error) {
            console.log(error)
        }
    }

    //CONFIGURACIONES ESPECIALES PARA EL CHECKOUT
    if (document.querySelector(".carrito-checkout")) {
        try {
            document.querySelector(".carrito-lateral").remove()
            document.querySelector(".carrito-lateral__background").remove()
            document.querySelector(".carrito-modal").remove()

            const carritoEnLocalStorage = JSON.parse(window.localStorage.getItem("carrito"))
            renderizarCarrito(carritoEnLocalStorage)
        } catch (error) {
            console.log(error)
        }
    }

    //Renderizamos el carrito a cargar la pagina
    if (document.querySelector(".carrito__container")) {
        try {
            const carritoEnLocalStorageInit = JSON.parse(window.localStorage.getItem("carrito"))
            renderizarCarrito(carritoEnLocalStorageInit)
        } catch (error) {
            console.log(error)
        }
    }

    //si existe el boton para agregar al carrito le vinculamos el evento para cuando le den click
    if (document.querySelector(".btn__add__carrito")) {
        try {
            const btnAddCarrito = document.querySelector(".btn__add__carrito")
            btnAddCarrito.addEventListener("click", (e) => {
                e.preventDefault()
                addCartItem()
                renderizarCarrito()
            })
        } catch (error) {
            console.log(error)
        }
    }

    //carrusel de tarjejtas    
    if (document.querySelector(".carousel__servicios")) {
        const serviciosCarousel = new Carousel(".carousel__servicios")
        serviciosCarousel.run()
    }
    if (document.querySelector(".carousel__productos")) {
        const productosCarousel = new Carousel(".carousel__productos")
        productosCarousel.run()
    }
    if (document.querySelector(".carousel__relacionados")) {
        const relacionadosCarousel = new Carousel(".carousel__relacionados")
        relacionadosCarousel.run()
    }

    //ANIMACION DE LAS CARDS PARA QUE APAREZCAN CUANDO SON MOSTRADAS EN EL VIEWPORT
    const animatedSections = document.querySelectorAll(".animation--intersecting")
    const intersectionHandler = (entries, observer) => {
        entries.map((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animation--intersecting--in")
                observer.unobserve(entry.target)
            }
        })
    }

    const Observer = new IntersectionObserver(intersectionHandler)
    animatedSections.forEach((item, index) => {
        Observer.observe(item)
    })





    const subMenuDesktop = document.querySelectorAll(".header__menu-submenu") || null
    if(subMenuDesktop){
        console.log("existe submenu")

        // subMenuDesktop.forEach((item) => {
        //     item.parentElement.addEventListener("mouseover", (e) => {
        //         item.classList.toggle("show")
        //     })
        // })

        // subMenuDesktop.forEach((item) => {
        //     item.parentElement.addEventListener("mouseout", (e) => {
        //         item.classList.toggle("show")
        //     })
        // })

    }








































})