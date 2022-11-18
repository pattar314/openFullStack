import React, { useState } from 'react';
import './App.css';
import Statistics from './components/Statistics';
import Button from './components/Button'

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let stats = (good || neutral || bad ? 
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      /> :
      <div className='stats-blank'>No feedback given</div>)

  


  return (
    <div className="App">
      <h1 className='title'>Give feedback</h1>
      <div className='buttons'>
        <Button name={'Good'} click={() => setGood(good +1)} />
        <Button name={'Neutral'} click={() => setNeutral(neutral + 1)} />
        <Button name={'Bad'} click={() => setBad(bad + 1)} />
      </div>
      {stats}
    </div>
  );
}

export default App;
