import Particle from "./component/particle/Particle"
import Card from "./component/card/Card"
import Hover_Button from "./component/hover_button/Button"
import "./App.css"

function App() {
    return (
        <div className="App">
            <Particle />
            <div className="card-list">
                <Card state="Pending" />
                <Card state="On Going" />
                <Card state="Done" />
            </div>
        </div>
    )
}

export default App
