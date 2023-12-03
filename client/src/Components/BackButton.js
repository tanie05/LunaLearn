import React from 'react';
import { NavLink } from 'react-router-dom';
import '../PagesCSS/ClassPage.css'
import { IoMdArrowBack } from 'react-icons/io';
export default function BackButton() {
  

  return (
    <NavLink to = {'/'} className= "back-btn">
      <IoMdArrowBack  style={{ cursor: 'pointer' }} />
    </NavLink>
  );
}