import React, { forwardRef, useState, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, ref) => {

  const [ visible, setVisible ] = useState(false)

  const showWhenVisible = { "display": visible ? '' : "none"}
  const hideWhenVisible = { "display": visible ? "none" : ''}

  const toggleVisibility = () => {
    console.log('visibility changed: ', visible)
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={ hideWhenVisible }>
        <button onClick={ toggleVisibility } > { props.buttonLabel } </button>
      </div>
      <div style={ showWhenVisible }>
        { props.children }
        <button onClick={ toggleVisibility }>cancel</button>
      </div>
    </>
  )
})

export default Toggleable