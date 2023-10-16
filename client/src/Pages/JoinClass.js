import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import '../PagesCSS/JoinClass.css'

export default function JoinClass() {
    const navigate = useNavigate()

    const [code, setCode] = useState();

    function updateCode(e) {
        setCode(prevState => e.target.value)
    }

    function joinClass() {
        fetch("/classes/join", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                code: code
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
            {
                alert(data.error);
                // console.log(data.error);
            }
            else {
                console.log(data.message);
                navigate("/");
            }
        })
    }

    return (
        <div className="join--class">
        <div className="join--class--form">
            <input 
                className="input--class--code"
                type="text"
                placeholder="Class Code"
                value={code}
                name="code"
                onChange={updateCode}
            >
            </input>

            <button type="submit" onClick={joinClass} className="join--class--btn">Join Class</button>
        </div>
        </div>
        
    )
}