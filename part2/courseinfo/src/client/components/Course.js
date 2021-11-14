import React from 'react'
import CourseSection from './CourseSection'

const Course = ({course}) => {
    return (
        <div className='course-wrapper'>
            <h1 className='course-name'>{course.name}</h1>
            {course.parts.map(part => <CourseSection key={"p"+part.id} name={part.name} exercises={part.exercises} /> )} 
            <div className='exercise-total'>Total of {course.parts.reduce((previous, current) =>  previous + current.exercises, 0)} exercises</div>
        </div>
    )
}

export default Course
