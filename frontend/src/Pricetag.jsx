import pricetag from "./assets/pricetag.png"

function Pricetag({price}) {

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            height: "30px",
            margin: "2px",
            position: "relative"
        }}>
            <img src={pricetag} style={{
                width: "100%",
                objectFit: "scale-down",
            }}/>
            <div style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                fontWeight: "bold",
            }}>
                ${price}
            </div>
        </div>
    )
}

export { Pricetag }