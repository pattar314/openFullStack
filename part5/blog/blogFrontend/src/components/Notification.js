import React from 'react'

const Notification = ({ content, status }) => {
  const styles = {
    wrapper: {
      'width': '75vw',
      'height': '2.5em',
      'backgroundColor': 'lightGrey',
      'fontSize': '2em',
      'borderRadius': '15px 15px',
      'border': 'solid grey 1.5px',
      'margin': 'auto'
    },
    success: {
      'color': 'green',
      'width': '75vw',
      'height': '2.5em',
      'margin': 'auto'
    },
    fail: {
      'width': '75vw',
      'height': '2.5em',
      'color': 'red',
      'margin': 'auto'
    },
  }
  return (
    <div className='notification-wrapper' style={styles.wrapper}>
      <div id='message-content' style={status === 'success' ? styles.success : styles.fail}>{content}</div>
    </div>
  )
}

export default Notification