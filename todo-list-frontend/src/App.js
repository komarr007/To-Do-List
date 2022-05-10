import Particle from "./component/particle/Particle"
import Card from "./component/card/Card"
import Hover_Button from "./component/hover_button/Button"
import "./App.css"

function App() {
    return (
        <div className="App">
            <Particle />
            <div className="card-list">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default App
