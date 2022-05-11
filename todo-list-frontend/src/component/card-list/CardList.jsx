import React, { useEffect, useState } from "react"
import "./style.css"

const CardList = (props) => {
    const [lists, setLists] = useState([])
    const state = props.state

    const fetchData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setLists(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="card-todo">
            {lists.map((list) => (
                <div>
                    {list.name === props.state ? (
                        <div className="card-list">
                            <h2>{list.name}</h2>
                            <p>{list.email}</p>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default CardList
