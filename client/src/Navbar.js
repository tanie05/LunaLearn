import React from "react"
import { AiOutlinePlus } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./LandingPage";
import './PagesCSS/Navbar.css'
import lunaicon from './lunaIcon.jpg';
import { MdOutlineChecklist } from "react-icons/md";

export default function NavBar() {

    const navigate = useNavigate();
    const {state, dispatch} = React.useContext(UserContext)

    function logOut() {
        localStorage.clear();
        dispatch({type: "CLEAR"})
        navigate("/auth/signin");
    }

    let role

    if(state) {
        role = state.role
    }

    return (
        <div>
        {
            state && 
            <div className="navbar">
                <div className="navbar--title">
                    <NavLink to="" style={{textDecoration: 'none', color: '#333333'}} >
                    <img src = {lunaicon} className="icon"/>
                    
                        
                    </NavLink>
                </div>

                <div className="welcome-message">Welcome {state.username}!</div>

                {/* <label class="switch">
                <input type="checkbox"/>
                <span class="slider round"></span>
                </label> */}
                
                <div className="navbar--links">

                    <NavLink to = {'/todo'} style={{color: "black"}}> <MdOutlineChecklist/> </NavLink>
                    <NavLink style={{textDecoration: 'none', color: "black"}} to = {role === "Teacher" ? "classes/createClass" : "classes/joinClass"}>
                        <div className="navbar--links--cont">
                            <AiOutlinePlus />
                        </div>
                    </NavLink>
                    
                    <div 
                        className="navbar--links--cont" 
                        onClick={logOut} 
                        style={{textDecoration: 'none', color: "black"}}
                    >
                        <TbLogout />
                    </div>
                </div>
            </div>
        }
        </div>
    )
}