import React from "react";

const App = () => {
  // const course = 'Half Stack application development';
  const part1 = 'Fundementals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

 /*  const Header = (props) => {
    <h1>props.course</h1>
  }

  const Content = (props) => {
    <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  }

  const Total = (props) => {
<p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  }
 */
  const Part = (props) => {
    return (
      <div>{props.part} {props.exercises}</div>
    )
  }



  return (
    <div>
      {/* <Header course={course} />
      <Content 
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
      exercises1={exercises1}
      exercises2={exercises2}
      exercises3={exercises3}
       /> */}

      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />

    </div>
  )
}


export default App;
