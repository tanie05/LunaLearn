import React, { useState } from 'react';
import '../PagesCSS/StudentList.css'; // Import your modal styles

const StudentList = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className='student-list-btn' onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default StudentList;
