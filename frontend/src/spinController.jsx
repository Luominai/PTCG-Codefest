// vars for handling drag event
let _enabled = true
let _dragging = false 
let _previousVelocity = 0
let _velocity = 0
let _selected = 0
let _previousTouch = undefined

// also needed for drag event but need to be provided
let _angle = 0
let _numCards = 0
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
const timeTillAutoSnap = 800
const rotationRegex = /rotateY\(-*\d*.*\d*deg\)/

function setup(carouselId, sceneId, angle, distance) {
    _carousel = document.getElementById(carouselId)
    _scene = document.getElementById(sceneId)
    _angle = angle
    _numCards = 360 / angle
    _distance = distance
    attachListeners()
    return [setInterval(handleVelocity, updateFrequency), removeListeners]
}

function handleMouseDown(e) {
    e.preventDefault()
    if (!_enabled) {
        return
    }
    _dragging = true
    _velocity = 0
    _carousel.style.transition = "transform .1s"
}
function handleMouseMove(e) {
    e.preventDefault()
    if (!_enabled) {
        return
    }
    if (_dragging) {
        _velocity = e.movementX
        console.log(e.movementX)
    }
}
function handleTouchMove(e) {
    e.preventDefault()
    if (!_enabled) {
        return
    }
    const touch = e.touches[0]
    if (_dragging && _previousTouch !== undefined) {
        const movement = (touch.pageX - _previousTouch.pageX)
        _velocity = Math.abs(movement) > touchMoveThreshold ? movement * touchVelocityMultiplier : _velocity
    }
    _previousTouch = touch
}
function handleTouchEnd() {
    e.preventDefault()
    if (!_enabled) {
        return
    }
    e._dragging = false
    _previousTouch = undefined
    snap(timeTillAutoSnap)
}
function handleMouseUp(e) {
    e.preventDefault()
    if (!_enabled) {
        return
    }
    _dragging = false
    snap(timeTillAutoSnap)
}
function handleMouseLeave(e) {
    e.preventDefault()
    if (!_enabled) {
        return
    }
    _dragging = false
    snap(timeTillAutoSnap)
}
function handleVelocity() {
    if (!_enabled) {
        return
    }
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
function snap(delay = 500, unconditional=false) {
    setTimeout(() => {
        const condition = useConstDeceleration ? _velocity === 0 : Math.abs(_velocity) < snapThreshold
        if (condition || unconditional) {
            console.log("snap")
            _velocity = 0
            _selected = Math.round(_selected)
            _carousel.style.transition = "transform .8s"
            _carousel.style.transform = _carousel.style.transform.replace(
                rotationRegex, 
                `rotateY(${_selected * _angle}deg)`
            )

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
    _carousel.style.transform = _carousel.style.transform.replace(
        rotationRegex, 
        `rotateY(${_selected * _angle}deg)`
    )
}
function attachListeners() {
    _scene.addEventListener("mousedown", handleMouseDown)
    _scene.addEventListener("mousemove", handleMouseMove)
    _scene.addEventListener("mouseup", handleMouseUp)
    _scene.addEventListener("mouseleave", handleMouseLeave)
    
    _scene.addEventListener("touchstart", handleMouseDown)
    _scene.addEventListener("touchmove", handleTouchMove)
    _scene.addEventListener("touchend", handleTouchEnd)
    _scene.addEventListener("touchcancel", handleTouchEnd)
}
function removeListeners() {
    _scene.removeEventListener("mousedown", handleMouseDown)
    _scene.removeEventListener("mousemove", handleMouseMove)
    _scene.removeEventListener("mouseup", handleMouseUp)
    _scene.removeEventListener("mouseleave", handleMouseLeave)
}
function getIndexOfSelected() {
    snap(0, true)
    const offset = -1 * Math.round(_selected) % _numCards
    console.log(_selected, _numCards, offset)
    if (offset < 0) {
        return _numCards + offset
    }
    return offset
}
function setCarouselEnabled(bool) {
    _enabled = bool
}

export { setup, getIndexOfSelected, setCarouselEnabled }