import React, { useEffect } from "react";
import icon from '../icon.png';

export default function ClassCard(props) {
    // title, teacher name, teacher profile image 
    const title = props.title;
    const teacherId = props.teacher;
    const teacherName = "Ravreet Kaur";
    


    // fetch("/")

    
    return (
        <div>
            <div>
                <div>props.title</div>
                <div>props.username</div>
                <img src={props.profileImage}></img>
            </div>
        </div>
    )
}