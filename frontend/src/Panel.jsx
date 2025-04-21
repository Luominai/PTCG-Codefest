import cardback from "./assets/cardback.png"

function Panel({card}) {
    return (
        <>
        <div style={{
            width: "250px",
            height: "280px",
            userSelect: "none",
            position: "relative",
            display: "flex",
            justifyContent: "center"
        }}>
            <img src={card.image} draggable={false} style={{
                width: "200px",
                height: "280px",
                objectFit: "fill",
                position: "absolute",
                backfaceVisibility: "hidden",
                zIndex: 1,
            }}/>
            <img src={cardback} draggable={false} style={{
                width: "200px",
                height: "280px",
                objectFit: "fill",
                position: "absolute",
                transform: "rotateY(180deg)",
                zIndex: 0
            }}/>
        </div>
        </>
    )
}

export { Panel }