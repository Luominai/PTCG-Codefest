import { Pricetag } from "./Pricetag"


function Card({imgSource, price}) {

    return(
        <>
        <div style={{
            width: "250px",
            height: "350px",
            userSelect: "none",
            position: "relative"
        }}
        >
            <img src={imgSource} style={{
                width: "100%",
                height: "100%",
                objectFit: "fill"
            }}/>

            <Pricetag price={price} size={"100px"} 
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