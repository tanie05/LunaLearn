import React, { useState } from "react";
import '../PagesCSS/CreateClass.css';
import {Navigate} from "react-router-dom"

export default function CreateClass() {
    const [newClass, setNewClass] = useState({
        title: "",
        description: ""
    })

    const [redirect, setRedirect] = useState(false);

    function updateClass(e) {
        const {name, value} = e.target

        setNewClass(prevState => {
            return (
                {
                    ...prevState,
                    [name]: value
                }
            )
        })
    }

    function createClass() {
        fetch("/classes/createclass", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: newClass.title,
                description: newClass.description
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success)
            {
                setRedirect(true);
            }
            else {
                console.log("Failed to create a class");
            }
        })
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    
    return (
        <div className="create-class-page">
            <div className="create-class-form">
            <input 
                className="input--class--title"
                type="text"
                placeholder="Title"
                value={newClass.title}
                name="title"
                onChange={updateClass}
            >
            </input>
            <textarea
                className="input--class--description"
                placeholder="Description"
                value={newClass.description}
                name="description"
                onChange={updateClass}
            >
            </textarea>

            <button className="submit-btn" type="submit" onClick={createClass}>Create Class</button>
        </div>
        </div>
        
    )
}