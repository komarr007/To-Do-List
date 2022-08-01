import Particle from "./component/particle/Particle"
import Card from "./component/card/Card"
import Modals from "./component/modals/Modals"
import React, { useState } from "react"

function App() {
    const [show, setShow] = useState(false)
    return (
        <div className="App">
            <Particle />
            <button
                onClick={() => {
                    setShow(true)
                }}
                className="btn-modal"
            >
                Add List
            </button>
            <div className="card-list-main">
                <Card state="Pending" />
                <Card state="On Going" />
                <Card state="Done" />
            </div>
            <Modals onClose={() => setShow(false)} show={show} />
        </div>
    )
}

export default App
