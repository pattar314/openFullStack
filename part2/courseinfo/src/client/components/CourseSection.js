import React from 'react'

const CourseSection = ({id, name, exercises}) => {
    return (
        <div className='section-wrapper' key={"s"+id}>
            {name}  {exercises}
        </div>
    )
}

export default CourseSection
