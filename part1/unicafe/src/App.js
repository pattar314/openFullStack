import React, { useState } from 'react';
import './App.css';

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + bad + neutral
  let average = ((good - bad)  / all ? (good - bad) / all : 0)
  let percent = ((good/all)*100 ? (good/all)*100 : 0)


  return (
    <div className="App">
      <h1 className='title'>Give feedback</h1>
      <div className='buttons'>
        <button value='Good' onClick={() => setGood( good + 1)}> Good </button>
        <button onClick={() => setNeutral(neutral + 1)} > Neutral </button>
        <button onClick={() => setBad(bad + 1)} > Bad </button>
      </div>
      <h1>Statistics</h1>
      <div className='goodStats'>Good: {good}</div>
      <div className='neutralStats'>Neutral: {neutral}</div>
      <div className='badStats'>Bad: {bad}</div>
      <div className='allStats'>All: {all}</div>
      <div className='averageStats'>Average: {average}</div>
      <div className='positiveStats'>Positive: {percent}%</div>
    </div>
  );
}

export default App;
