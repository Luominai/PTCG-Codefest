import { useState } from "react"
import cardBack from "./assets/225px-Cardback.jpg"

function Card({imgSource}) {
    const [revealed, setRevealed] = useState(false)

    return(
        <>
        <div style={{
            width: "150px",
            height: "210px",
            userSelect: "none",
            transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.4s",
        }}
        onClick={(e) => {
            e.preventDefault()
            setRevealed(!revealed)
        }}
        >
            <div className="front" style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%"
            }}>
                <img src={imgSource} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "scale-down"
                }}/>
            </div>
            <div className="back" style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%"
            }}>
                <img src={cardBack} style={{
                    width: "100%",
                    objectFit: "scale-down"
                }}/>
            </div>
        </div>
        </>
    )
}

export { Card }