import React, { useState } from "react";
import '../PagesCSS/CreateClass.css';

export default function CreateClass() {
    const [newClass, setNewClass] = useState({
        title: "",
        description: ""
    })

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
        fetch("/classes/createClass", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
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
                console.log(data.message);
            }
            else {
                console.log("Failed to create a class");
            }
        })
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