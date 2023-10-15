import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassPage() {

    const { classId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [content, setContent] = useState([]);


    useEffect(() => {
        fetch(`/classes/${classId}`, {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(response => response.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
                setContent(data.content)
                setTeacherId(data.teacher)
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [classId]);

    return (
        <div>
            {/* Render your class page content here */}
        </div>
    );
}

