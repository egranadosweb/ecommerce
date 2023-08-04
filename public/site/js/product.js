
if (document.querySelector("section.product")) {
    //vista previa miniaturas imagenes de producto
    const retrato = document.querySelector(".product__img")
    const thumbnails = document.querySelectorAll(".product__images__thumbnail")
    retrato.src = thumbnails[0].src

    thumbnails.forEach((item, index) => {
        item.addEventListener("mouseover", (e) => {
            const srcThumbnail = e.target.getAttribute("src")
            retrato.src = srcThumbnail
        })
    })

    //contador cantidad de productos
    const btnLess = document.querySelector(".product__cta__amount__control__btn--less")
    const btnMore = document.querySelector(".product__cta__amount__control__btn--more")
    const cantidadLabel = document.querySelector(".product__cta__amount__display")
    let cantidad = 1

    btnLess.addEventListener("click", (e) => {
        if (cantidad === 1) {
            return
        }
        cantidad--
        cantidadLabel.innerHTML = cantidad
    })
    btnMore.addEventListener("click", (e) => {
        if (cantidad == 24) {
            return
        }
        cantidad++
        cantidadLabel.innerHTML = cantidad
    })

}