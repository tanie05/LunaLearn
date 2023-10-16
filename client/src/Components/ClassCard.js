import React, { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import '../PagesCSS/ClassCard.css'
import { Link } from "react-router-dom";
import { UserContext } from "../LandingPage";

export default function ClassCard(props) {
    const [teacher, setTeacher] = useState({});
    const {state, dispatch} = React.useContext(UserContext)

    useEffect(() => {
        fetch(`/users/${props.item.teacher}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log("Error");
            }
            else {
                // console.log(data.user.username);
                setTeacher(data.user);
                
            }
        })
    }, [])

    const [randomColor, setRandomColor] = useState("");

    const colors = [
        "#6FB1FC", // Soft Blue
        "#AED581", // Light Green
        "#FFD3E0", // Subtle Pink
        "#B39DDB", // Muted Purple
        "#FFEE58"  // Gentle Yellow
    ];
    useEffect(() => {
        fetch(`/users/${props.item.teacher}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log("Error");
            }
            else {
                setTeacher(data.user);
            }
        });
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setRandomColor(randomColor);
    }, []);




    function deleteClass() {
        // console.log(props.item._id);
        fetch(`/classes/delete/${props.item._id}`, {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log("error");
            }
            else {
                console.log("class deleted")
                window.location.href = window.location.href;
            }
        })
    }
    
    return (
        
            <div className="class-card-container">

            <NavLink to={`classes/${props.item._id}`}>
            <div className="class-card-info" style={{ backgroundColor: randomColor }}>
                                <div className="card-items class-title">{props.item.title}</div>
                                <div className="card-items teacher-name">{teacher.username}</div>
                            </div>
            </NavLink>
              
            
                {state._id === props.item.teacher && 
                    <div className="class-card-icon-containers">
                        
                        <Link to= {'/classes/createClass'} state= {props.item} >
                        <BiSolidEditAlt className="card-items" />
                        </Link>

                        <div onClick={deleteClass}>
                            <MdDelete className="card-items" />
                        </div>
                    </div>
                }
            </div>
        
    )
}