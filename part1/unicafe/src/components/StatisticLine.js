import React from 'react'

const StatisticLine = ({name, value}) => {
    return (
        <tr>
        <th>{name}</th><td>{value}</td>
        </tr>
    )
}

export default StatisticLine
