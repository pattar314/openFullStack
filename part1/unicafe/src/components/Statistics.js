import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({good, neutral, bad}) => {
    let all = good + bad + neutral
    let average = ((good - bad)  / all ? (good - bad) / all : 0)
    let percent = ((good/all)*100 ? (good/all)*100 : 0)
    return (
        <div>
            <h1>Statistics</h1>
            <br />
            {/* 

            */}

            <table>
                <tbody>
                    <StatisticLine name={'Good'} value={good} />
                    <StatisticLine name={'Neutral'} value={neutral} />
                    <StatisticLine name={'Bad'} value={bad} />
                    <StatisticLine name={'All'} value={all} />
                    <StatisticLine name={'Average'} value={average} />
                    <StatisticLine name={'Positive'} value={percent} /> 
                </tbody>
            </table>

        </div>
    )
}

export default Statistics
