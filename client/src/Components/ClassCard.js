import React, { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import '../PagesCSS/ClassCard.css'
import { Link } from "react-router-dom";
import { UserContext } from "../LandingPage";

export default function ClassCard(props) {

//    console.log(props.item._id);

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



    const [redirect, setRedirect] = useState(false);

    function deleteClass() {

        // console.log(props.item);
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
                setRedirect(true);
            }
        })
    }
    
    if(redirect){
        return <Navigate to={`/`} />
    }
   
    return (
        
            <div className="class-card-container">

            <NavLink to={`classes/${props.item._id}`} className="navlink">
            <div className="class-card-info" style={{ backgroundColor: randomColor }}>
                                <div className="card-items class-title" >{props.item.title}</div>
                                <div className="card-items teacher-name">Teacher : {teacher.username}</div>
                            </div>
            </NavLink>
               
            
                {state._id === props.item.teacher && 
                    <div className="class-card-icon-containers">
                         <div className="class-code class-code-card" style={{color: "black"}}>Code : {props.item.code}</div>
                        <div className="iconsss">
                        <Link to= {'/classes/createClass'} state= {props.item} >
                        <BiSolidEditAlt className="card-items" />
                        </Link>

                        <div onClick={deleteClass}>
                            <MdDelete className="card-items" />
                        </div>
                        </div>
                        
                    </div>
                }
            </div>
        
    )
}