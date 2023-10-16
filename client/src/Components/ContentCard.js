import React, {useEffect, useState} from 'react';
import '../PagesCSS/ContentCard.css';
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../LandingPage'


export default function ContentCard(props) {
  const { contentType, description, media, classId } = props.item;
  const [redirect, setRedirect] = useState(false);
  const [teacher, setTeacher] = useState();
  const {state, dispatch} = React.useContext(UserContext);

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
            setTeacher(data.class.teacher);
        }
    })
  },[])

  function deleteContent() {
    fetch(`/contents/delete/${props.item._id}`, {
      method: "put",
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        console.log("error")
      }
      else{
        console.log("content deleted")
        setRedirect(true)

      }
    })
  }

  if(redirect){
    return (<Navigate to = {`/classes/${props.item.classId}`} />)
  }

  return (
    <div className="content-card">
      <h2 className='content-title'>{contentType}</h2>
      <p className='content-description'>{description}</p>

      {
        teacher === state._id

        &&

        <div className='icons-container'>
        <Link to= {`/createcontent/${props.item.classId}`} state={props.item}  >
          <BiSolidEditAlt className="card-items" />
        </Link>
        <div onClick={deleteContent}>
          <MdDelete className = "card-items"/>
        </div>
      </div>
      }

      <div className="media-container">
        {media.map((item, index) => (
          <div key={index} className="media-item">
            {item.type === 'image/jpeg' || item.type === 'image/png' ? (
              <img src={item.data} alt={`Media ${index + 1}`} />
            ) : (
              <div>{item.type}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
