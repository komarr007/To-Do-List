import React, { useEffect, useState } from "react"
import axios from "axios"
import "./style.css"

const CardList = (props) => {
    const [lists, setLists] = useState([])
    const state = props.state

    const fetchData = async () => {
        try {
            await fetch("http://127.0.0.1:8000/data")
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setLists(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const updateButton = async (id, title, desc, status) => {
        let state = "Done"
        if (status === "Pending") {
            state = "On Going"
        } else if (status === "On Going") {
            state = "Done"
        }

        await axios
            .put("http://127.0.0.1:8000/update?id=" + id + "&status=" + state)
            .then((response) => {
                console.log(response)
            })

        window.location.reload()
    }

    return (
        <div className="card-todo">
            {lists.map((list, id) => (
                <div key={id}>
                    {list.Status === state ? (
                        <div className="card-list" key={list.id}>
                            <div className="card-list-item">
                                <h2>{list.Tittle}</h2>
                                <p>{list.Description}</p>
                            </div>
                            <div className="card-list-button">
                                {list.Status === "Done" ? (
                                    <button>delete</button>
                                ) : (
                                    <div className="card-list-button">
                                        <button
                                            className="update"
                                            onClick={() =>
                                                updateButton(
                                                    list.id,
                                                    list.Tittle,
                                                    list.Description,
                                                    list.Status
                                                )
                                            }
                                        >
                                            update
                                        </button>
                                        <button>delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default CardList
