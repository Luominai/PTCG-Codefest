import { useState } from 'react'
import { Carousel } from './Carousel'
import { getIndexOfSelected } from './spinController'
import TestAPI from './TestAPI'

const testCards = [
    {price: 12.7, image: "https://images.pokemontcg.io/sm12/1.png"},
    {price: 14.39, image: "https://images.pokemontcg.io/base4/3.png"},
    {price: 12.0, image: "https://images.pokemontcg.io/ex7/3.png"},
    {price: 12.7, image: "https://images.pokemontcg.io/sm12/1.png"},
    {price: 14.39, image: "https://images.pokemontcg.io/base4/3.png"},
    {price: 12.0, image: "https://images.pokemontcg.io/ex7/3.png"},
    {price: 12.7, image: "https://images.pokemontcg.io/sm12/1.png"},
    {price: 14.39, image: "https://images.pokemontcg.io/base4/3.png"},
    {price: 12.0, image: "https://images.pokemontcg.io/ex7/3.png"}
]

function App() {
    const [count, setCount] = useState(0)
    const [carouselVisible, setCarouselVisible] = useState(true)

    return (
        <>
        <div style={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "center"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Carousel cards={testCards} visible={carouselVisible}/>
                </div>
                <div id="debug">
                    hi
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <button style={{
                        width: "160px",
                        height: "50px",
                        backgroundColor: "#60d0f8",
                        border: "3px solid #ecfafb",
                        borderRadius: "40px",
                        boxShadow: "0px 0px 3px #ecfafb",
                        boxShadow: "0px 0px 6px 2px #e1e3ee",
                        color: "#ecfafb",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        const index = getIndexOfSelected()
                        setCarouselVisible(!carouselVisible)
                        // make the selected card invisible on the carousel
                        // push the carousel down
                    }}
                    >
                        Open
                    </button>
                </div>
                {/* <div> 
                    <TestAPI/>
                </div> */}
            </div>
        </div>
        </>
    )
}

export default App
