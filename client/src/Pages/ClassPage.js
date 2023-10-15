import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassPage() {
    const {classId} = useParams()
    const [classDetails, setClassDetails] = useState({
        class: {},
        content: [],
        teacher: {}
    })

    useEffect(async() => {
        await fetch(`/classes/${classId}`, {
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
                setClassDetails(prevState => {
                    return ({
                        ...prevState,
                        class: data.class,
                        content: data.content
                    })
                })
            }
        })

        if(classDetails.class.teacher) {
            fetch(`/users/${classDetails.class.teacher}`, {
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
                    setClassDetails(prevState => {
                        return ({
                            ...prevState,
                            teacher: data.user
                        })
                    })
                }
            })
        }
    }, [])

    console.log(classDetails);

    return (
        <div>
            <div>{classDetails.class.title}</div>
            {/* <div>{classDetails.class}</div> */}
        </div>
    );
}

