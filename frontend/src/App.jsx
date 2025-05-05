import { useState } from 'react'
import { PackSelect } from './PackSelect'

function App() {
    const [state, setState] = useState("packSelect")

    if (state === "packSelect") {
        return <PackSelect state={state} setState={setState}/>
    }
    if (state === "open") {
        
    }
}

export default App
