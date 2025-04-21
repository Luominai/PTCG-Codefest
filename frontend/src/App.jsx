import { useState } from 'react'
import { PlayerIcon } from './PlayerIcon'
import { Carousel } from './Carousel'

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

    return (
        <>
            <div style={{
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
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
                        // overflow: "hidden"
                    }}>
                        <Carousel cards={testCards}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
