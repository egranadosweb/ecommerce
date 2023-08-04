class Carousel {
    constructor(carouselWrappperClass, autoPlay = true, time = 2300) {
        console.log("Se inicio el contructor del carousel: ")
        this.carouselWrapperClass = carouselWrappperClass
        this.carouselWrapper = document.querySelector(this.carouselWrapperClass)
        this.carouselCards = this.carouselWrapper.querySelectorAll(".carousel__card")
        this.leftArrow = this.carouselWrapper.querySelector(".carousel__card__left-arrow")
        this.rightArrow = this.carouselWrapper.querySelector(".carousel__card__right-arrow")
        this.breadCrumbs = this.carouselWrapper.querySelectorAll(".carousel__card__bradcrumb")
        this.btnsCarousel = this.carouselWrapper.querySelectorAll(".carousel__card__btn")
        this.lastSlider = this.carouselCards.length - 1
        this.currentSlider = 0
        this.intervalId = null
        this.autoPlay = autoPlay
        this.time = time
    }

    prepare() {
        console.log("Preparado las cards del carousel:")
        this.carouselCards.forEach((item, index) => {
            if (index === this.currentSlider) {

                item.classList.add("carousel__card--selected")
            }
            item.style.transform = `translateX(${index * 100}%)`
        })
        this.breadCrumbs.forEach((item, index) => {
            if (index === this.currentSlider) {
                item.classList.add("carousel__card__bradcrumb--selected")
            }
            item.setAttribute("id", index)
        })
    }

    prevCarousel(e) {
        if (this.currentSlider === 0) {
            this.currentSlider = this.lastSlider
        } else {
            this.currentSlider--
        }
        this.carouselCards.forEach((item, index) => {
            item.classList.remove("carousel__card--selected")
            item.style.transform = `translateX(${100 * (index - this.currentSlider)}%)`
            if (index === this.currentSlider) {
                item.classList.add("carousel__card--selected")
            }
        })
        this.breadCrumbs.forEach((item, index) => {
            item.classList.remove("carousel__card__bradcrumb--selected")
            if (index === this.currentSlider) {
                item.classList.add("carousel__card__bradcrumb--selected")
            }
        })
    }

    nextCarousel(e) {
        if (this.currentSlider === this.lastSlider) {
            this.currentSlider = 0
        } else {
            this.currentSlider++
        }
        //console.log(this)
        this.carouselCards.forEach((item, index) => {
            item.classList.remove("carousel__card--selected")
            item.style.transform = `translateX(${100 * (index - this.currentSlider)}%)`
            if (index === this.currentSlider) {
                item.classList.add("carousel__card--selected")
            }
        })
        this.breadCrumbs.forEach((item, index) => {
            item.classList.remove("carousel__card__bradcrumb--selected")
            if (index === this.currentSlider) {
                item.classList.add("carousel__card__bradcrumb--selected")
            }
        })
    }

    moveCarousel(e) {
        if (e) {
            this.currentSlider = Number(e.target.getAttribute("id"))
        } else {
            this.currentSlider++
        }

        this.carouselCards.forEach((item, index) => {
            item.classList.remove("carousel__card--selected")
            item.style.transform = `translateX(${100 * (index - this.currentSlider)}%)`
            if (index === this.currentSlider) {
                item.classList.add("carousel__card--selected")
            }
        })

        this.breadCrumbs.forEach((item, index) => {
            item.classList.remove("carousel__card__bradcrumb--selected")
            if (index === this.currentSlider) {
                item.classList.add("carousel__card__bradcrumb--selected")
            }
        })
        if (this.currentSlider === this.lastSlider) {
            this.currentSlider = -1
        }
    }

    autoCarousel() {
        if (this.autoPlay) {
            const _this = this
            this.intervalId = setInterval(function () {
                _this.moveCarousel()
            }, this.time)
        }
        return
    }

    stopCarousel() {
        clearInterval(this.intervalId)
    }

    run() {
        const _this = this
        //console.log(_this)
        this.prepare();
        this.leftArrow.addEventListener("click", (e) => {
            _this.prevCarousel()
        });
        this.rightArrow.addEventListener("click", (e) => {
            _this.nextCarousel()
        });
        this.breadCrumbs.forEach((item, index) => {
            item.addEventListener("click", (e) => {
                _this.moveCarousel(e)
            })
        });

        this.autoCarousel(this.autoPlay, this.time);

        ["mouseover", "mouseout"].forEach((item, index) => {
            if (item === "mouseover") {
                //console.log(this.leftArrow)
                this.leftArrow.addEventListener(item, (e) => {
                    _this.stopCarousel(e)
                })
                this.rightArrow.addEventListener(item, (e) => {
                    _this.stopCarousel(e)
                })
                this.breadCrumbs.forEach((bc, index) => {
                    bc.addEventListener(item, (e) => {
                        _this.stopCarousel(e)
                    })
                })
                this.btnsCarousel.forEach((btn, index) => {
                    btn.addEventListener(item, (e) => {
                        _this.stopCarousel(e)
                    })
                })

            } else {
                this.leftArrow.addEventListener(item, (e) => {
                    _this.autoCarousel()
                })
                this.rightArrow.addEventListener(item, (e) => {
                    _this.autoCarousel()
                })
                this.breadCrumbs.forEach((bc, index) => {
                    bc.addEventListener(item, (e) => {
                        _this.autoCarousel()
                    })
                })
                this.btnsCarousel.forEach((btn, index) => {
                    btn.addEventListener(item, (e) => {
                        _this.autoCarousel()
                    })
                })
            }


        })
    }

}

