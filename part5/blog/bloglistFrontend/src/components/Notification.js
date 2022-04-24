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
      'margin': 'auto'
    },
    failed: {
      'color': 'red',
      'margin': 'auto'
    },
  }
  return (
    <div className='notification-wrapper' style={styles.wrapper}>
      <div className='messageContent' style={status === 'success' ? styles.success : styles.failed}>{content}</div>
    </div>
  )
}

export default Notification