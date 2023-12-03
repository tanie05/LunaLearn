import React, { useState } from 'react';
import '../PagesCSS/StudentList.css'; // Import your modal styles
import { IoMdCloseCircle } from "react-icons/io";
const StudentList = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    
      
      <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
      </section>
      <div className='student-list-btn' onClick={handleClose}><IoMdCloseCircle/></div>
    </div>
   
   
  );
};

export default StudentList;
