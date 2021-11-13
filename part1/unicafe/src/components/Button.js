import React from 'react'

const Button = ({name, click}) => {
    return (
        <button onClick={click}>{name}</button>
    )
}

export default Button
