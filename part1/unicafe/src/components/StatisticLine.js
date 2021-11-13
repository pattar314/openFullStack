import React from 'react'

const StatisticLine = ({name, value}) => {
    return (
        <div className='statisticLine'>{name}: {value}</div>
    )
}

export default StatisticLine
