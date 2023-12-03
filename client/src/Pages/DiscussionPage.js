import React, { useEffect, useState } from "react";
import { UserContext } from "../LandingPage";
import { useParams } from "react-router";
import "../PagesCSS/DiscussionPage.css"

export default function DiscussionForum() {
    const {state, dispatch} = React.useContext(UserContext)
    const {classId} = useParams();

    // console.log(state.username);

    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function submitMessage(e) {
        e.preventDefault();

        fetch(`/classes/${classId}/addDiscussions`, {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: state.username,
                text: message
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.Error) {
                alert(data.Error);
            }
            else {
                console.log(data.Message)
            }
            }
        )

        setMessage('');
    }

    useEffect(() => {
        fetch(`/classes/${classId}/discussions`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.Error) {
                alert(data.Error)
            }
            else {
                setMessages(data.messages)
            }
        })
    })

    return (
        <div className="discussion--page">
            <div className="discussion--page--list">
                {messages.length > 0 && 
                    messages.map(message => {
                        return (
                            <div className="discussion--page--message">
                                <div className="discussion--page--message--user">{message.userName}</div>: 
                                <div className="disussion--page--message--text">{message.text}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="discussion--page--query">
                <input
                    type="text"
                    onChange={handleChange}
                    value={message}
                    className="discussion--page--input"
                ></input>
                <button onClick={submitMessage} className="discussion--page--button">Enter</button>
            </div>
        </div>
    )
}