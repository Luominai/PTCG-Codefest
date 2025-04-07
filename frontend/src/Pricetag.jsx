import { IconContext } from "react-icons/lib"
import { IoPricetagOutline, IoPricetag } from "react-icons/io5";

function Pricetag({price, size, tagStyle, textStyle}) {

    return (
        <>
        <div style={tagStyle}>
            <IconContext.Provider value={{
                style: {
                    transform: "rotate(.625turn)",
                    color: "white",
                },
                size: size
            }}>
                <IoPricetag/>
            </IconContext.Provider>
        </div>
        <div style={tagStyle}>
            <IconContext.Provider value={{
                style: {
                    transform: "rotate(.625turn)",
                    color: "black"
                },
                size: size
            }}>
                <IoPricetagOutline/>
            </IconContext.Provider>
        </div>
        <div style={textStyle}>
            ${price}
        </div>
        </>
    )
}

export { Pricetag }