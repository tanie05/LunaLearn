import React, { useState, useEffect} from "react";
import '../PagesCSS/CreateClass.css';
import {Navigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import BackButton from "../Components/BackButton";
export default function CreateClass() {

    const location = useLocation();
    const  classToEdit = location.state;


    const [newClass, setNewClass] = useState({
        title: "",
        description: "",
        coverImage: ""
    })

    const [redirect, setRedirect] = useState(false);
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if( classToEdit) {
          setEditMode(true)

        setNewClass({
            title : classToEdit.title,
            description: classToEdit.description,
            coverImage : classToEdit.coverImage

        })
          
    
        }
      }, [])


    function updateClass(e) {
        const {name, value} = e.target

        setNewClass(prevState => {
            return (
                {
                    ...prevState,
                    [name]: value
                }
            )
        })
    }

    function createClass() {

        
        if(editMode){
            // editing
            // /edit/:classId
            console.log(newClass)
            fetch(`/classes/edit/${classToEdit._id}`, {
                method: "put", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title: newClass.title,
                    description: newClass.description,
                    coverImage : newClass.coverImage
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.success)
                {
                    setRedirect(true);
                }
                else {
                    console.log("Failed to edit the class");
                }
            })
        }
        else{
            // creating
            fetch("/classes/createclass", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title: newClass.title,
                    description: newClass.description,
                    coverImage: newClass.coverImage
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.success)
                {
                    setRedirect(true);
                }
                else {
                    console.log("Failed to create a class");
                }
            })
        }

        }
        

    if(redirect){
        return <Navigate to={'/'} />
    }

    function updateCoverImage(event){
        const file = event.target.files[0];
        
        setNewClass((prev) => {
            return ({
                ...prev,
                coverImage: file
            })
        })
    }

   
    
    return (
        <div className="create-class-page">
            <BackButton/>
            
            <div className="create-class-form">
            <input 
                className="input--class--title"
                type="text"
                placeholder="Title"
                value={newClass.title}
                name="title"
                onChange={updateClass}
            >
            </input>
            <textarea
                className="input--class--description"
                placeholder="Description"
                value={newClass.description}
                name="description"
                onChange={updateClass}
            >
            </textarea>

            <input
            type="file"
            name="coverImage"
            className="input--class--image" // Style this as needed
            accept="image/*" // Allow only image files to be selected
            onChange={updateCoverImage} // Call function when a file is selected
            />

            <button className="submit-btn" type="submit" onClick={createClass}>
                {editMode? "Edit" : "Create Class"}
                
            </button>



        </div>
        </div>
               
    )
}