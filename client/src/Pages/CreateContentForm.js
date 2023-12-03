import React, {useEffect, useState } from 'react'
import axios from 'axios';
import '../PagesCSS/CreateContent.css';
import { Navigate, useParams, useLocation, Link, } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { IoMdArrowBack } from 'react-icons/io';


export default function CreateContentForm() {

  const {classId} = useParams()
  const location = useLocation();
  const contentToEdit = location.state;

  const [description, setDescription] = useState("")
  const [contentType, setContentType] = useState("")
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [editMode, setEditMode] = useState(false)
  

  useEffect(() => {
    if(contentToEdit) {
    setEditMode(true)
    setDescription(contentToEdit.description)
    setContentType(contentToEdit.contentType)
    }
}, [])

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("description", description);
    formData.append("contentType", contentType);
    formData.append("classId", classId);
    formData.append("file", file);

    console.log(classId)
    
    if(editMode){
      const result = await axios.put(
        `/contents/edit/${contentToEdit._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      );
      
      if (result) {
        alert("Edited Successfully!!!");
        setRedirect(true)
      }


    }else{
      const result = await axios.post(
        "/contents/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      );
      
      if (result) {
        alert("Uploaded Successfully!!!");
        setRedirect(true)
      }
    }

    
  };
  
  if(redirect){
    return <Navigate to={`/classes/${classId}`} />
}


  return (
    <div className="create-content-form">
      <Link  to={`/classes/${classId}`} className='class-back-btn'>
      <IoMdArrowBack/>
      </Link>
      
      <h4 className='create-content-heading'>Create a content</h4>
      <form className="create-content-form" onSubmit={submitImage}>
        
        <br />
        <textarea
          className="create-content-form-element content-description"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <select
          className="create-content-form-element content-type"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          required
        >
          <option value="">Select Content Type</option>
          <option value="Notes">Notes</option>
          <option value="Announcement">Announcement</option>
        </select>
        
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className='create-content-form-element content-file-select'
        />
        <br />
        <button type="submit" className='create-content-form-element content-submit'>
          {editMode ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  );
}
