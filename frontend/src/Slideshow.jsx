import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { Card } from './Card'
import { useState } from "react"

function Slideshow() {
    const [currentCard, setCurrentCard] = useState(0)
    const [leftHover, setLeftHover] = useState(false)
    const [rightHover, setRightHover] = useState(false)

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "10px"
        }}>
            <BsChevronLeft style={{
                fontSize: "70px",
                cursor: "pointer",
                backgroundColor: leftHover ? "lightgray" : ""
            }}
            onMouseEnter={() => {
                setLeftHover(true)
            }}
            onMouseLeave={() => {
                setLeftHover(false)
            }}
            />
            <Card price={100.99} imgSource={"https://archives.bulbagarden.net/media/upload/thumb/0/0b/HoundoomScarletViolet34.jpg/270px-HoundoomScarletViolet34.jpg"}/>
            <BsChevronRight style={{
                fontSize: "70px",
                cursor: "pointer",
                backgroundColor: rightHover ? "lightgray" : ""
            }}
            onMouseEnter={() => {
                setRightHover(true)
            }}
            onMouseLeave={() => {
                setRightHover(false)
            }}
            />
        </div>
    )
}

export { Slideshow }