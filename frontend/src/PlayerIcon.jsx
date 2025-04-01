import smile from "./assets/smile.svg"

function PlayerIcon({color, name, money}) {
    return (
        <>
        <div style={{
            display: "flex",
            width: "150px"
        }}>
            <div style={{
                width: "50px",
                height: "50px",
                maskRepeat: "no-repeat",
                maskSize: "100%",

                background: color,
                maskImage: `url(${smile})`
            }}>

            </div>

            <div style={{
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "cursive"
            }}>
                <div style={{
                    color: color
                }}>
                    {name}
                </div>
                <div style={{
                    color: "green"
                }}>
                    ${money}
                </div>
            </div>
        </div>
        </>
    )
}

export { PlayerIcon }