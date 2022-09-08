import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import "./style.css"

const Modals = (props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [posts, setPosts] = useState([])

    if (!props.show) {
        return null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addPosts(title, description)
        props.onClose()
        setTitle("")
        setDescription("")
    }

    const addPosts = async (title, description) => {
        try {
            await axios
                .post("http://127.0.0.1:8000/record?title=" + title + "&desc=" + description)
                .then((response) => {
                    setPosts([response.data, ...posts])
                })
            toast.success("Add List Success")
        } catch (e) {
            toast.error("Add List Failed")
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="header">
                    <h4 className="title">Add Your List</h4>
                </div>
                <div className="body">
                    <form>
                        <div className="input-field">
                            <input
                                ref={{ required: true }}
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="input-title"
                            />
                            <br />
                            <textarea
                                ref={{ required: true }}
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                    </form>
                </div>
                <div className="footer">
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className="close-btn" onClick={props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modals
