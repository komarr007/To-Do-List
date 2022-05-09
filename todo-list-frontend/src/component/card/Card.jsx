import React from "react"
import CardList from "../card-list/CardList"
import "./style.css"

function Card(props) {
    const state = props.state

    return (
        <div className="card">
            <div className="state">
                <h1>{state}</h1>
                <button
                    onClick={() => {
                        console.log("TES")
                    }}
                >
                    <b>TES DAH</b>
                </button>
            </div>
            <div className="card-item">
                <CardList />
            </div>
        </div>
    )
}

export default Card
