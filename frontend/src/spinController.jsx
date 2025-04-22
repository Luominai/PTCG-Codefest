// vars for handling drag event
let _dragging = false 
let _previousVelocity = 0
let _velocity = 0
let _selected = 0
let _previousTouch = undefined

// also needed for drag event but need to be provided
let _angle = 0
let _distance = 0
let _carousel = null
let _scene = null

// options
const useConstDeceleration = false
const constDeceleration = 5
const percentDeceleration = .95
const snapThreshold = 3
const rotationMultiplier = 1
const updateFrequency = 50
const touchVelocityMultiplier = 2
const touchMoveThreshold = 10

function setup(carouselId, sceneId, angle, distance) {
    _carousel = document.getElementById(carouselId)
    _scene = document.getElementById(sceneId)
    _angle = angle
    _distance = distance
    attachListeners()
    return [setInterval(handleVelocity, updateFrequency), removeListeners]
}

function handleMouseDown(e) {
    e.preventDefault()
    _dragging = true
    _velocity = 0
    _carousel.style.transition = "transform .1s"
}
function handleMouseMove(e) {
    e.preventDefault()
    if (_dragging) {
        _velocity = e.movementX
        console.log(e.movementX)
    }
}
function handleTouchMove(e) {
    e.preventDefault()
    const touch = e.touches[0]
    if (_dragging && _previousTouch !== undefined) {
        const movement = (touch.pageX - _previousTouch.pageX)
        _velocity = movement > touchMoveThreshold ? movement * touchVelocityMultiplier : _velocity
    }
    _previousTouch = touch
}
function handleMouseUp(e) {
    e.preventDefault()
    _dragging = false
    snap(1000)
}
function handleMouseLeave(e) {
    e.preventDefault()
    _dragging = false
    snap(1000)
}
function handleVelocity() {
    _previousVelocity = _velocity
    updateRotation()
    if (useConstDeceleration) {
        if (_velocity === 0 && _previousVelocity !== 0) {
            snap()
        }
    }
    else {
        if (Math.abs(_velocity) < snapThreshold && Math.abs(_previousVelocity) >= snapThreshold) {
            snap()
        }
    }
}
function snap(delay = 500) {
    setTimeout(() => {
        const condition = useConstDeceleration ? _velocity === 0 : Math.abs(_velocity) < snapThreshold
        if (condition) {
            _velocity = 0
            _selected = Math.round(_selected)
            _carousel.style.transition = "transform .8s"
            _carousel.style.transform = `rotateY(${_selected * _angle}deg) translateZ(${_distance * -1}px)`

            setTimeout(() => {
                _carousel.style.transition = "transform .1s"
            }, 800)
        }
    }, delay)
}
function updateRotation() {
    if (_velocity > 0) {
        _velocity = Math.max(0, useConstDeceleration ? 
                                _velocity - constDeceleration : 
                                _velocity * percentDeceleration)
    }
    if (_velocity < 0) {
        _velocity = Math.min(0, useConstDeceleration ? 
                                _velocity + constDeceleration : 
                                _velocity * percentDeceleration)
    }
    _selected = _selected + (_velocity * rotationMultiplier / 10000 * updateFrequency)
    _carousel.style.transform = `rotateY(${_selected * _angle}deg) translateZ(${_distance * -1}px)`
}
function attachListeners() {
    _scene.addEventListener("mousedown", handleMouseDown)
    _scene.addEventListener("mousemove", handleMouseMove)
    _scene.addEventListener("mouseup", handleMouseUp)
    _scene.addEventListener("mouseleave", handleMouseLeave)
    
    _scene.addEventListener("touchstart", handleMouseDown)
    _scene.addEventListener("touchmove", handleTouchMove)
    _scene.addEventListener("touchend", handleMouseUp)
    _scene.addEventListener("touchcancel", handleMouseLeave)
}
function removeListeners() {
    _scene.removeEventListener("mousedown", handleMouseDown)
    _scene.removeEventListener("mousemove", handleMouseMove)
    _scene.removeEventListener("mouseup", handleMouseUp)
    _scene.removeEventListener("mouseleave", handleMouseLeave)
}

export { setup }