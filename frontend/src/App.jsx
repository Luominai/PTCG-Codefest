import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './Card'
import { PlayerIcon } from './PlayerIcon'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <PlayerIcon color={"blue"} name={"Name"} money={100}/>
            <div>
                <Card imgSource={"https://archives.bulbagarden.net/media/upload/thumb/0/0b/HoundoomScarletViolet34.jpg/270px-HoundoomScarletViolet34.jpg"}/>
            </div>
        </>
    )
}

export default App
