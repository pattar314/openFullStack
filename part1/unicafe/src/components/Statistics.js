import React from 'react'

const Statistics = ({good, neutral, bad}) => {
    let all = good + bad + neutral
    let average = ((good - bad)  / all ? (good - bad) / all : 0)
    let percent = ((good/all)*100 ? (good/all)*100 : 0)
    return (
        <div>
            <h1>Statistics</h1>
      <div className='goodStats'>Good: {good}</div>
      <div className='neutralStats'>Neutral: {neutral}</div>
      <div className='badStats'>Bad: {bad}</div>
      <div className='allStats'>All: {all}</div>
      <div className='averageStats'>Average: {average}</div>
      <div className='positiveStats'>Positive: {percent}%</div>
        </div>
    )
}

export default Statistics
