import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../LandingPage';
import ContentCard from '../Components/ContentCard';
import "../PagesCSS/ClassPage.css";
import BackButton from '../Components/BackButton';
import StudentList from './StudentList';
import { AiOutlinePlus } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

export default function ClassPage() {
    const {classId} = useParams()
    const {state, dispatch} = React.useContext(UserContext)

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

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const studentNames = [
        'Jennie',
        'Lina',
        'Sam',
        'Laurel'
    ]

    const students = studentNames.map((name) => {
        return (<li>{name}</li>)
    })

    return (
        <div>
            <BackButton/>
           
            <div>
            {
                display &&
                <div>
                <div className='class-header'>
                    
                    <div className='title'>{classDetails.class.title}</div>

                    {
                    state._id === classDetails.class.teacher &&
                    <div className='class-code'>Code: {classDetails.class.code}</div>
                    } 

                    <div className='class-info-bar'>
                    

                    <div>
                        <div onClick={() => setShowModal(true)} className='class-info class-student-list'><BsPeopleFill/></div>
                        <StudentList show={showModal} handleClose={handleCloseModal}>
                            <h2 className='student-list-heading'>Students</h2>
                            <ul>
                                {students}
                            </ul>
                        </StudentList>
                       
                    </div>

                    <div>
                    {
                        state._id === classDetails.class.teacher &&
                        <Link className='add-content-button class-info' to={`/createcontent/${classId}`}>
                            <AiOutlinePlus/>
                        </Link>
                    }
                    </div>

                    </div>

                </div>
                
                
                <div className='description--add--btn'>
                <div className='description'>
                    {classDetails.class.description}
                </div>

                

                
                </div>
                </div>
                
               
            }

        </div>
<hr/>
        <div>
            
            {display && 
                classDetails.content.map(item => {
                    return (
                        <ContentCard item = {item} teacherId = {classDetails.class.teacher} />
                    )
                })
            }
        </div>
        </div>
        

    );
}
