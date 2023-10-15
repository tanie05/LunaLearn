import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

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
                console.log(data.error);
            }
            else {
                console.log(data.message);
                navigate("/");
            }
        })
    }

    return (
        <div>
            <input 
                className="input--class--code"
                type="text"
                placeholder="Class Code"
                value={code}
                name="code"
                onChange={updateCode}
            >
            </input>

            <button type="submit" onClick={joinClass}>Join Class</button>
        </div>
    )
}