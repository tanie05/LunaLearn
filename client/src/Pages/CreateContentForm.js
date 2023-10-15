import React, { useState } from 'react';
import { useParams } from 'react-router';
import '../PagesCSS/CreateContent.css';


export default function CreateContentForm() {

    
  const { classId } = useParams();
  const [content, setContent] = useState({
    contentType: '',
    description: '',
    media: [],
    classId: classId,
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

  function handleSubmit(event) {
    event.preventDefault();

    // creating content
    fetch("/contents", {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      if(data.success) {
        console.log(data.message);
      } else {
        console.log("Failed to create content");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
    
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
