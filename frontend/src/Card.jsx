import { Pricetag } from "./Pricetag"


function Card({card}) {

    return(
        <>
        <div style={{
            width: "250px",
            height: "350px",
            userSelect: "none",
            position: "relative"
        }}
        >
            <img src={card.image} style={{
                width: "100%",
                height: "100%",
                objectFit: "fill"
            }}/>

            <Pricetag price={card.price.toFixed(2)} 
            size={"100px"} 
            fillColor={"white"}
            outlineColor={"black"}
            tagStyle={{
                position: "absolute",
                right: "-15px",
                bottom: "-40px"
            }}
            textStyle={{
                position: "absolute",
                right: "5px",
                bottom: "5px",
                fontWeight: "bolder",
                fontFamily: "cursive",
                fontSize: "14px",
                color: "green",
            }}
            />
        </div>
        </>
    )
}

export { Card }