import { useState } from 'react'
import { PlayerIcon } from './PlayerIcon'
import { Slideshow } from './Slideshow'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div style={{
                height: "100dvh",
                display: "flex",
                flexDirection: "column"
            }}>
                <div style={{
                    display: "flex",
                    flexGrow: 0,
                    justifyContent: "space-evenly"
                }}>
                    <PlayerIcon color={"blue"} name={"Name"} money={100}/>
                    <PlayerIcon color={"red"} name={"Name"} money={100}/>
                    <PlayerIcon color={"green"} name={"Name"} money={100}/>
                    <PlayerIcon color={"yellow"} name={"Name"} money={100}/>
                </div>
                <div style={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "center"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <Slideshow/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
