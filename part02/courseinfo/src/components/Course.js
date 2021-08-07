import React from "react";

import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
  const courseName = course.name;
  const  parts = course.parts
  return (
    <div>
      <Header courseName={courseName}/>
      <Content content={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default Course;