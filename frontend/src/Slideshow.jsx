import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { Card } from './Card'
import { useState } from "react"

function Slideshow({cards}) {
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
            onClick={() => {
                setCurrentCard(currentCard - 1 > 0 ? currentCard - 1 : cards.length - 1)
            }}
            onMouseEnter={() => {
                setLeftHover(true)
            }}
            onMouseLeave={() => {
                setLeftHover(false)
            }}
            />
            <Card card={cards[currentCard]}/>
            <BsChevronRight style={{
                fontSize: "70px",
                cursor: "pointer",
                backgroundColor: rightHover ? "lightgray" : ""
            }}
            onClick={() => {
                setCurrentCard(currentCard + 1 < cards.length ? currentCard + 1 : 0)
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