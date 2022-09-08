import React, { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
    }, [lists])

    const updateButton = (id, status) => {
        Swal.fire({
            title: "Move List Status?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                let state = "Done"
                if (status === "Pending") {
                    state = "On Going"
                } else if (status === "On Going") {
                    state = "Done"
                }
                try {
                    axios
                        .put("http://127.0.0.1:8000/update?id=" + id + "&status=" + state)
                        .then((response) => {
                            console.log(response)
                        })
                } catch (error) {
                    console.log(error)
                }
                toast.success("List has been move to next state")
            }
        })
    }

    const deleteButton = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete("http://127.0.0.1:8000/delete?id=" + id).then((response) => {
                        console.log(response)
                    })
                    fetchData()
                } catch (error) {
                    console.log(error)
                }
                toast.success("Delete List Success")
            }
        })
    }

    const buttonView = () => {
        if (lists.Status === "Done") {
            return <button className="delete-button" onClick={() => deleteButton(lists.id)} />
        } else if (lists.Status === "On Going") {
            return (
                <div className="list-button">
                    <button
                        className="check-button"
                        onClick={() => updateButton(lists.id, lists.Status)}
                    />
                    <button
                        className="undo-button"
                        onClick={() => updateButton(lists.id, lists.Status)}
                    />
                    <button className="delete-button" onClick={() => deleteButton(lists.id)} />
                </div>
            )
        } else {
            return (
                <div className="list-button">
                    <button
                        className="check-button"
                        onClick={() => updateButton(lists.id, lists.Status)}
                    />
                    <button className="delete-button" onClick={() => deleteButton(lists.id)} />
                </div>
            )
        }
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
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteButton(list.id)}
                                    />
                                ) : (
                                    <div className="list-button">
                                        <button
                                            className="check-button"
                                            onClick={() => updateButton(list.id, list.Status)}
                                        />
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteButton(list.id)}
                                        />
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
