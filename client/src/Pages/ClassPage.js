import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../LandingPage';
import ContentCard from '../Components/ContentCard';
import "../PagesCSS/ClassPage.css";
import BackButton from '../Components/BackButton';
import StudentList from './StudentList';
import { AiOutlinePlus } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";
import axios from 'axios'

export default function ClassPage() {
    const {classId} = useParams()
    const {state, dispatch} = React.useContext(UserContext)

    const [classDetails, setClassDetails] = useState({})
    const [filteredContent, setFilteredContent] = useState([]);
    const [display, setDisplay] = useState(false)
    const [studentNames, setStudentNames]  = useState([])

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
                console.log(data);
                setClassDetails(data)
                setFilteredContent(data.content)
                setDisplay(true)
            }
        })

        axios.get(`/classes/class_students/${classId}`)
        .then((res) => {
            setStudentNames(res.data.students)
            // console.log('Response:', res.data.students); 
        })
        .catch((error) => {
            
            console.error('Error:', error);
        });

    }, [])

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const students = studentNames.map((item) => {
        return (<li>{item.username} - {item.email}</li>)
    })

    const [contentType, setContentType] = useState("");
    // classDetails.content
    const filterContent = (e) => {
        e.preventDefault();

        if(contentType === ""){
            setFilteredContent(classDetails.content)
        }
    
        if (contentType && classDetails.content) {
            const filteredContent = classDetails.content.filter((item) => item.contentType === contentType);
            setFilteredContent(filteredContent);
        }
        
    };

    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
    };

    const clearFilter = (e) => {
        e.preventDefault();
        setContentType("")
        setFilteredContent(classDetails.content)
    }

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
                        <NavLink style={{textDecoration: 'none', color: "black", fontSize: "25px", margin: " 0px 5px"}} to={`/classes/${classId}/discussions`}>
                            <GoCommentDiscussion />
                        </NavLink>
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
        {
            (classDetails.content && classDetails.content.length>0) && 
            <form className='filter-form' onSubmit={filterContent}>
                <select
                    className="filter-form-input"
                    value={contentType}
                    onChange={(e) => handleContentTypeChange(e)}   
                >
                    <option value="">Select Content Type</option>
                    <option value="Notes">Notes</option>
                    <option value="Announcement">Announcement</option>
                </select>
                <button onClick={clearFilter} className='filter-content-btn'>Clear</button>
                <input type='submit' value='Filter' className='filter-content-btn'/>
            </form>
           
            
        }

        <div>
            
        {display && (
                    (filteredContent.length > 0 ? filteredContent : classDetails.content).map(item => (
                        <ContentCard key={item._id} item={item} teacherId={classDetails.class.teacher} />
                    ))
                )}
        </div>
        </div>
        

    );
}
