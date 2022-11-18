import { useState } from 'react';
import './App.css';

function App() {
  const [selected, setSelected] = useState(Math.floor(Math.random())* 10)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})
  const [highVote, setHighVote] = useState(0)
  const [highAnecdote, setHighAnecdote] = useState(5)
  
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const handleVote = () => {
    let copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    if(copy[selected] > highVote){
      setHighVote(copy[selected])
      setHighAnecdote(selected)
    }
  }

  const rollRandom = () =>  {
    setSelected(Math.floor(Math.random() * 6))
  }



  return (
    <div className="App">
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div className='quoteVotes'>This quote has {points[selected]} votes</div>
      <button onClick={() => handleVote()}>Vote</button> 
      <button onClick={() => rollRandom()}>Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[highAnecdote]}

    </div>
  );
}

export default App;