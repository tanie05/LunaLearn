import React, { useEffect, useState } from "react";
import ClassCard from "../Components/ClassCard"
import { UserContext } from "../LandingPage";



export default function Home() {
    const {state} = React.useContext(UserContext);
    const [classes, setClasses] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        fetch("/classes/", {
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
                setFlag(true)
            }
        })
    }, [])

    // console.log(state);
    
    
    return (
        <div className="class-cards-container">
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
            {
                state && (flag ? classes.length === 1 && <h3>No result</h3> : <h3>Loading...</h3>)
            }
        </div>
    )
}