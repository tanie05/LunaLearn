import React, { useEffect, useState } from "react";
import UserContext from "../LandingPage"
import ClassCard from "../Components/ClassCard"

export default function Home() {
    const state = localStorage.getItem('jwt')
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch("/classes", {
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
                // console.log(data.classes);
                setClasses(data.classes);
            }
        })
    }, [])

    // console.log(state);

    
    return (
        <div>
            {state && classes.length > 0 && 
                classes.map(item => {
                    return (
                        <ClassCard 
                            key = {item._id}
                            item = {item}
                        />
                    )
                })
            }
        </div>
    )
}