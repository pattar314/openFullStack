import React from "react";

const App = () => {
 
 
 
/*   const part1 = {
    name: 'Fundementals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  } */


    const course = {
      name: 'Half Stack application development',
      parts : [
        {
        name: 'Fundementals of React',
        exercises: 10
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      
    ]
  }
        

  return (
    <>
      {course.name}
      {course.parts.map(part => <div>{part['name']}  {part['exercises']} </div>) }
    </>   
  )
}


export default App;
