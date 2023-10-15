import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassPage() {
    const {classId} = useParams()

    const [classDetails, setClassDetails] = useState({})
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        fetch(`/classes/${classId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                console.log(data.error);
            }
            else {
                // console.log(data);
                setClassDetails(data)
                setDisplay(true)
            }
        })
    }, [])

    // console.log(classDetails);

    return (
        <div>
            {
                display &&
                <div>
                    <div>{classDetails.class.title}</div>
                    <div>{classDetails.class.description}</div>
                </div>
            }
        </div>
    );
}

