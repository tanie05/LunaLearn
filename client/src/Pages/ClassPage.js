import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import '../PagesCSS/ClassPage.css'

export default function ClassPage() {
  
  return (
    <div>
      <Link className='add-content-button' to={`/createcontent/:{classId}`} >Add</Link>
    </div>
  )
}
