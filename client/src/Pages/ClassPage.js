import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../LandingPage';
import ContentCard from '../Components/ContentCard';
import "../PagesCSS/ClassPage.css";

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

    // console.log(classDetails.content);

    // const contentList = classDetails.content.map(item => {
    //     return (
    //         <div>
    //             <h3>{item.contentType}</h3>
    //             <p>{item.description}</p>
    //         </div>
    //     )
    // })

    return (
        <div>
            <div>
            {
                display &&
                <>
                <div className='class-details'>
                    
                    <div className='title'>{classDetails.class.title}</div>
                    <div className='description'>{classDetails.class.description}</div>

                    
                </div>
                <div>
                    {
                    state._id === classDetails.class.teacher &&
                    <Link className='add-content-button' to={`/createcontent/${classId}`} >Add</Link>
                    }
                </div>
                </>
                
               
            }

        </div>

        <div>
            {/* {contentList} */}
            {display && 
                classDetails.content.map(item => {
                    return (
                        <ContentCard item = {item} />
                    )
                })
            }
        </div>
        </div>
        

    );
}
