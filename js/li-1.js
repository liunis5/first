const next = function(slide, offset) {
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = parseInt(slide.dataset.active, 10)
    let nextIndex = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return nextIndex
}

const image = (index) => {
    let nextIndex = index
    let nextSelector = '#id-image-' + String(nextIndex)
    let className = 'li-active'
    removeClassAll(className)
    let img = e(nextSelector)
    img.classList.add(className)
}

const indicator = (index) => {
    let nextIndex = index
    let indicatorClass = 'li-white'
    removeClassAll(indicatorClass)
    let indicatorSelector = '#id-indicator-' + String(nextIndex)
    let indicator = e(indicatorSelector)
    indicator.classList.add(indicatorClass)
}

const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    slide.dataset.active = nextIndex
    image(nextIndex)
}

const showIndicatorAtIndex = function(slide, index) {
    let nextIndex = index
    slide.dataset.active = nextIndex
    indicator(nextIndex)
}

const showAtIndex = function(slide, index) {
    showImageAtIndex(slide, index)
    showIndicatorAtIndex(slide, index)
}

const buttonSlide = (event) => {
    let self = event.target
    let offset = parseInt(self.dataset.offset, 10)
    let slide = self.parentElement
    let nextIndex = next(slide, offset)
    showAtIndex(slide, nextIndex)
}

const indicatorSlide = (event) => {
    let self = event.target
    let index = parseInt(self.dataset.index, 10)
    let slide = self.closest('.li-slide')
    showAtIndex(slide, index)
}

const bindEventSlide = function() {
    let selector = '.li-slide-button'
    bindAll(selector, 'click', function(event) {
        log('点击到了')
        buttonSlide(event)
    })
}

const bindEventIndicator = function() {
    let selector = '.li-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        indicatorSlide(event)
    })
}



// 自动播放
const playNextImage = function() {
    // 求出下一张图片的 index
    let slide = e('.li-slide')
    let index = next(slide, 1)
    showAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}


const __main = function() {
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
