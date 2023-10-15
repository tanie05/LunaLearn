import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"

export default function SignIn() {
    // const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })


    function updateUser(e) {
        const {name, value} = e.target

        setUser(prevState => {
            return (
                {
                    ...prevState,
                    [name]: value
                }
            )
        })
    }

    function signIn() {
        fetch("/auth/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.Error) {
                console.log(data.Error);
            }
            else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                // dispatch({type: "USER", payload: data.user})
                // navigate("/");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div>
            <input
                className="input--email"
                type="email"
                placeholder="E-mail"
                value={user.email}
                name="email"
                onChange={updateUser}
            >
            </input>
            <input
                className="input--password"
                type="password"
                placeholder="Password"
                value={user.password}
                name="password"
                onChange={updateUser}
            >
            </input>

            <button type="submit" onClick={signIn}>Sign In</button>
        </div>
    )
}