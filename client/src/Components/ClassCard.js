import React, { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";


export default function ClassCard(props) {
    const [teacher, setTeacher] = useState({});

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

    function editClass() {
        console.log("here");
    }

    function deleteClass() {
        console.log("here");
    }
    
    return (
        <NavLink to={`classes/${props.item._id}`}>
            <div>
                <div>
                    <div>{props.item.title}</div>
                    <div>{teacher.username}</div>
                </div>
                {teacher._id === props.item.teacher && 
                    <div>
                        <div onClick={editClass}>
                            <BiSolidEditAlt />
                        </div>
                        <div onClick={deleteClass}>
                            <MdDelete />
                        </div>
                    </div>
                }
            </div>
        </NavLink>
    )
}