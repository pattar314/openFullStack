import React from 'react'
import CourseSection from './CourseSection'

const Course = ({course}) => {
    return (
        <div className='course-wrapper'>
            <h1 className='course-name'>{course.name}</h1>
            {course.parts.map(part => <CourseSection key={"p"+part.id} name={part.name} exercises={part.exercises} /> )} 
        </div>
    )
}

export default Course
