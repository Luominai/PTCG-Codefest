import { useState } from 'react'
import { Card } from './Card'
import { PlayerIcon } from './PlayerIcon'
import { Pricetag } from './Pricetag'
import { Modifier } from './Modifier'

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
                        <Card imgSource={"https://archives.bulbagarden.net/media/upload/thumb/0/0b/HoundoomScarletViolet34.jpg/270px-HoundoomScarletViolet34.jpg"}/>
                        
                        <div style={{
                            display: "flex",
                        }}>
                            <div style={{
                                display: "flex",
                                flexGrow: 1
                            }}>
                                <Modifier/>
                            </div>
                            <Pricetag price={100}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
