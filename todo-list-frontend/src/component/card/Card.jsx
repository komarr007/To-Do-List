import React from "react"
import CardList from "../card-list/CardList"
import "./style.css"

function Card(props) {
    const state = props.state

    return (
        <div className="card">
            <div className="state">
                <h1>{state}</h1>
            </div>
            <div className="card-item">
                <CardList state={state} />
            </div>
        </div>
    )
}

export default Card
