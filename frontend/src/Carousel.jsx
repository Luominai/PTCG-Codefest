import { useState, useRef, useEffect } from "react"
import { Panel } from "././Panel"

const cardForMeasure = {price: 12.7, image: "https://images.pokemontcg.io/sm12/1.png"}

// vars for handling drag event
let dragging = false 
let previousVelocity = 0
let velocity = 0
let selected = 0
const deceleration = 5
const rotationMultiplier = 1
const updateFrequency = 50

function Carousel({cards}) {
    // the measure ref is used to dynamically determine the size of a card
    const measure = useRef()         

    // vars for handling rendering
    const angle = 360 / cards.length  // the angle in degrees between one card and its neighbors
    const [distance, setDistance] = useState(0) // the distance between the center of the 3d shape and its faces
    const [width, setWidth] = useState(0)       // width of a card
    const [height, setHeight] = useState(0)     // height of a card

    // on render, grab the width of the card from the measure ref and calculate distance
    useEffect(() => {   
        const width = measure.current.scrollWidth   // use scrollWidth for the actual size of the content, not just the visible portion (the whole element will be out of view)
        const height = measure.current.scrollHeight // same reason as above
        const distance = (width / 2) / Math.tan((angle / 2) * (2 * Math.PI / 360))
        setWidth(width)
        setHeight(height)
        setDistance(distance)
        console.log(width, height, distance)

        const scene = document.getElementById("scene")
        scene.addEventListener("mousedown", handleMouseDown)
        scene.addEventListener("mousemove", handleMouseMove)
        scene.addEventListener("mouseup", handleMouseUp)
        scene.addEventListener("mouseleave", handleMouseLeave)

        const velocityInterval = setInterval(() => handleVelocity(angle, distance, updateFrequency), updateFrequency)

        return () => {
            scene.removeEventListener("mousedown", handleMouseDown)
            scene.removeEventListener("mousemove", handleMouseMove)
            scene.removeEventListener("mouseup", handleMouseUp)
            scene.removeEventListener("mouseleave", handleMouseLeave)
            clearInterval(velocityInterval)
        }
    }, [])

    return (
        <>
        {/* Fling this div to the edges of space and time so nobody will ever know it existed */}
        <div style={{
            position: "absolute",
            top: "-1000px",
            left: "-1000px",
            visibility: "hidden"
        }}
        ref={measure}
        >
            <Panel card={cardForMeasure}/>
        </div>

        {/* Following along with https://3dtransforms.desandro.com/ */}
        {/* All (direct) children of this element share the same vanishing point */}
        {/* By default, the vanishing point for a 3D space is positioned at the center. (perfect for a carousel) */}
        {/* This div establishes the 3d space and sets dimensions for the window*/}
        <div id={"scene"} style={{
            perspective: "1000px",
            width: `${width}px`,
            height: `${height}px`
        }}>
            {/* This div creates the object we want to display in 3d space */}
            {/* width: 100% and height: 100% are used so that this element's transform-origin is centered at the center of the 3d space */}
            {/* By default, the transform-origin of an element is at its own center */}
            {/* Position relative is here so its children can be position absolute */}
            {/* transform-style preserve-3d is here so that the children render in the 3d space established above */}
            {/* translateZ is here so that when the size of the carousel changes, we move it back accordingly to keep the cards the same size */}
            {/* transformOrigin adjusts for the translateZ */}
            {/* rotateY is here so the carousel turns when changing selected card */}
            <div id={"carousel"} style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transform: `rotateY(${selected * angle}deg) translateZ(${distance * -1}px)`,
                transformOrigin: `center center ${distance * -1}px`,
                transition: "transform 0.1s"
            }}>
                {cards.map((card, index) => (
                    // The divs inside here make up the faces of the 3d object
                    /* The divs are positioned absolutely so that they are relative to its nearest relatively positioned parent (the 3d object)
                    which means they will stack on top of each other*/
                    // translateZ is here to put distance between the 3d object and the face (so they no longer stack on each other)
                    // rotateY is here so that each face is rotated according to its position in the carousel
                    <div style={{
                        position: "absolute",
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotateY(${angle * index}deg) translateZ(${distance}px)`,
                    }}>
                        <Panel card={card}/>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

function handleMouseDown(e) {
    const carousel = document.getElementById("carousel")
    dragging = true
    carousel.style.transition = "transform .1s"
}
function handleMouseMove(e) {
    if (dragging) {
        velocity = e.movementX
        console.log(e.movementX)
    }
}
function handleMouseUp(e) {
    dragging = false
}
function handleMouseLeave(e) {
    dragging = false
}
function handleVelocity(angle, distance, frequency) {
    const carousel = document.getElementById("carousel")
    previousVelocity = velocity
    if (velocity > 0) {
        velocity = Math.max(0, velocity - deceleration)
        selected = selected + (velocity * rotationMultiplier / 10000 * frequency)
        carousel.style.transform = `rotateY(${selected * angle}deg) translateZ(${distance * -1}px)`
    }
    if (velocity < 0) {
        velocity = Math.min(0, velocity + deceleration)
        selected = selected + (velocity * rotationMultiplier / 10000 * frequency)
        carousel.style.transform = `rotateY(${selected * angle}deg) translateZ(${distance * -1}px)`
    }
    if (velocity === 0 && previousVelocity !== 0) {
        setTimeout(() => {
            if (velocity === 0 && !dragging) {
                selected = Math.round(selected)
                carousel.style.transition = "transform .8s"
                carousel.style.transform = `rotateY(${selected * angle}deg) translateZ(${distance * -1}px)`

                setTimeout(() => {
                    carousel.style.transition = "transform .1s"
                }, 800)
            }
        }, 500)
    }
}

export { Carousel }