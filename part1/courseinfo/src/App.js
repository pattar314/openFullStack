import React from "react";

const App = () => {
  const course = 'Half Stack application development';
 
 
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


  const parts = [
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


  return (
    <>
      {course}
      {parts.map(part => <div>{part['name']}  {part['exercises']} </div>) }
    </>   
  )
}


export default App;
