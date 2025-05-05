import { useState, useRef, useEffect } from "react"
import { Panel } from "././Panel"
import { getIndexOfSelected, setup, setCarouselEnabled } from "./spinController"

const cardForMeasure = {price: 12.7, image: "https://images.pokemontcg.io/sm12/1.png"}

function Carousel({cards}) {
    // the measure ref is used to dynamically determine the size of a card
    const measure = useRef()         

    // vars for handling rendering
    const [angle, setAngle] = useState(360 / cards.length)
    const [distance, setDistance] = useState(0)
    const [width, setWidth] = useState(0)       // width of a card
    const [height, setHeight] = useState(0)     // height of a card
    const [selected, setSelected] = useState(-1)  // index of selected card
    const [mode, setMode] = useState("select")

    // on render, grab the width of the card from the measure ref and calculate distance
    useEffect(() => {   
        const width = measure.current.scrollWidth   // use scrollWidth for the actual size of the content, not just the visible portion (the whole element will be out of view)
        const height = measure.current.scrollHeight // same reason as above
        const angle = 360 / cards.length                  
        const distance = (width / 2) / Math.tan((angle / 2) * (2 * Math.PI / 360))

        setWidth(width)
        setHeight(height)
        setAngle(angle)
        setDistance(distance)

        const [interval, removeListeners] = setup("carousel", "scene", angle, distance)

        return () => {
            removeListeners()
            clearInterval(interval)
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
            height: `${height}px`,
        }}>
            {/* This div creates the object we want to display in 3d space */}
            {/* width: 100% and height: 100% are used so that this element's transform-origin is centered at the center of the 3d space */}
            {/* By default, the transform-origin of an element is at its own center */}
            {/* Position relative is here so its children can be position absolute */}
            {/* transform-style preserve-3d is here so that the children render in the 3d space established above */}
            {/* translateZ is here so that when the size of the carousel changes, we move it back accordingly to keep the cards the same size */}
            {/* rotateY is here so the carousel turns when changing selected card */}
            <div id={"carousel"} style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transform: `translateZ(${distance * -1}px) rotateY(0deg)`,
                transformOrigin: `center center`,
                transition: "transform 1s"
            }}>
                {cards.map((card, index) => {
                    const thereIsACardSelected = selected >= 0
                    const thisCardIsSelected = selected === index

                    return (
                    // The divs inside here make up the faces of the 3d object
                    /* The divs are positioned absolutely so that they are relative to its nearest relatively positioned parent (the 3d object)
                    which means they will stack on top of each other*/
                    // translateZ is here to put distance between the 3d object and the face (so they no longer stack on each other)
                    // rotateY is here so that each face is rotated according to its position in the carousel
                    <div style={{
                        position: "absolute",
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `rotateY(${angle * index}deg)`,
                        transformStyle: "preserve-3d",
                    }}>
                        <div style={{
                            transformStyle: "preserve-3d",
                            transform: `translateZ(${thisCardIsSelected ? 750 : distance}px)`,
                            opacity: thereIsACardSelected && !thisCardIsSelected ? 0 : 1,
                            transition: "transform 0.5s, opacity 0.2s"
                        }}>
                            <Panel card={card}/>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div style={{
                display: "flex",
                transformStyle: "preserve-3d",
                justifyContent: "center",
                position: "relative",
                opacity: selected >= 0 ? 0 : 1,
                transition: "opacity 0.2s"
            }}>
                <button style={{
                    position: "absolute",
                    top: "20px",
                    transformStyle: "preserve-3d",
                    width: "160px",
                    height: "50px",
                    backgroundColor: "#60d0f8",
                    border: "3px solid #ecfafb",
                    borderRadius: "40px",
                    boxShadow: "0px 0px 3px #ecfafb",
                    boxShadow: "0px 0px 6px 2px #e1e3ee",
                    color: "#ecfafb",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "transform 0.1s",
                }}
                onClick={() => {
                    const button = document.getElementById("button")
                    button.style.transform = "scale(0.95)"
                    setTimeout(() => {
                        button.style.transform = "scale(1)"
                    }, 100)

                    const selectedIndex = getIndexOfSelected()
                    console.log(selectedIndex)
                    setSelected(selectedIndex)
                    setCarouselEnabled(false)
                }}
                id={"button"}
                >
                    Open
                </button>
            </div>
        </div>
        </>
    )
}

export { Carousel }