import React, { useState } from 'react';
import './App.css';
import Statistics from './components/Statistics';

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
        <button value='Good' onClick={() => setGood( good + 1)}> Good </button>
        <button onClick={() => setNeutral(neutral + 1)} > Neutral </button>
        <button onClick={() => setBad(bad + 1)} > Bad </button>
      </div>
      {stats}
    </div>
  );
}

export default App;
