import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";
import '../PagesCSS/SignUp.css';

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        profileImg: "",
        role: "Teacher"
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

    function signUp() {
        fetch("/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.Error) {
                console.log(data.Error);
            }
            else {
                console.log(data.Message);
                navigate("/auth/signin");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="sigup-page">
        <div className="signup-form">
            <input 
                className="input--username"
                type="text"
                placeholder="Name"
                value={user.username}
                name="username"
                onChange={updateUser}
            >
            </input>
            <input
                className="input--email"
                type="email"
                placeholder="E-mail"
                value={user.email}
                name="email"
                onChange={updateUser}
            ></input>
            <input
                className="input--password"
                type="password"
                placeholder="Password"
                value={user.password}
                name="password"
                onChange={updateUser}
            >
            </input>
            <input
                className="input--profilePic"
                type="file"
                multiple accept="image/*"
                name="profileImg"
                onChange={updateUser}
            >
            </input>            
            <div className="input--role">
                Role: 
                <label>
                    <input
                        type="radio"
                        value="Teacher"
                        name="role"
                        checked={user.role === "Teacher"}
                        onChange={updateUser}
                    >
                    </input>
                    Teacher
                </label>
                <label>
                    <input
                        type="radio"
                        value="Student"
                        name="role"
                        checked={user.role === "Student"}
                        onChange={updateUser}
                    >
                    </input>
                    Student
                </label>
            </div>

            <button className="submit-btn" type="submit" onClick={signUp}>Sign Up</button>

            <div className="message">Already Have an account?
                <NavLink style={{textDecoration: "none", color: "rgb(8,38,74)"}} to="/auth/signin"> Log In</NavLink>
            </div>
        </div>
        </div>
        
    )
}