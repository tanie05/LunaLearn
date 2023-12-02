import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import '../PagesCSS/CreateContent.css';
import { Navigate } from 'react-router-dom';

export default function CreateContentForm() {
  
  const location = useLocation();
  const contentToEdit = location.state;
    
  const { classId } = useParams();

  // console.log(classId)
  const [content, setContent] = useState({
    contentType: '',
    description: '',
    media: [],
    classId: classId
  });

  function handleTypeChange(e) {
    setContent((prevValue) => {
      return { ...prevValue, contentType: e.target.value };
    });
  }

  function handleDescriptionChange(e) {
    setContent((prevValue) => {
      return { ...prevValue, description: e.target.value };
    });
  }

  const handleMediaUpload = (e) => {
    const uploadedFiles = e.target.files;
    const mediaPreviews = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        mediaPreviews.push({ type: file.type, data: event.target.result });

        if (mediaPreviews.length === uploadedFiles.length) {
          setContent((prevValue) => {
            return { ...prevValue, media: mediaPreviews };
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const [redirect, setRedirect] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if(contentToEdit){

      setEditMode(true);

      setContent({
        contentType: contentToEdit.contentType,
        description: contentToEdit.description,
        media: contentToEdit.media,
        classId: contentToEdit.classId
      })
    }
  },[])

  function handleSubmit(event) {
    event.preventDefault();
    console.log(content);

    if(editMode){
      // editing
      // /edit/:contentId
      // console.log(content)

      fetch(`/contents/edit/${contentToEdit._id}`, {
        method: "put",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          contentType: content.contentType,
          description: content.description,
          media: content.media,
          classId: content.classId
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          setRedirect(true);
        }
        else{
          console.log("Failed to edit the content")
        }
      })
    }
    else{

      // creating content
      fetch("/contents/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          contentType: content.contentType,
          description: content.description,
          media: content.media,
          classId: content.classId
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log(data.message);
          setRedirect(true);
        } else {
          console.log("Failed to create content");
        }
        console.log(data)
      })
      .catch(error => {
        // console.error('Error:', error);
        alert(error)
      });
    }
          
  }

  if(redirect){
    return (<Navigate to = {`/classes/${content.classId}`} />) 
  }

  return (
    <div className='content-form-container'>

      <form className='content-form' onSubmit={handleSubmit}>

        <select className='content-input-select' value={content.contentType} onChange={(e) => handleTypeChange(e)}>

          <option value=''>Type of Content</option>
          <option value='Notes'>Notes</option>
          <option value='Assignment'>Assignment</option>
          <option value='Announcement'>Announcement</option>

        </select>

        <input
          className='content-input-description'
          value={content.description}
          placeholder='Description'
          onChange={(e) => handleDescriptionChange(e)}
        />

        <input 
        className='content-input-media'
        type='file' 
        onChange={handleMediaUpload} 
        multiple accept="image/*, video/*, application/pdf" 
        />
        
        <input 
        className='submit-btn'
        value= 'Submit' 
        type = 'submit' 
        />

      </form>

    </div>
  );
}