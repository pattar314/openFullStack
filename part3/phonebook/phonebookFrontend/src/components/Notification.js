import React from "react";

const Notification = ({message, status}) => {
    let styles = {
        wrapperStyles : {
            display: 'flex',
            width: '90vw',
            height: '15vh',
            margin: 'auto',
            padding: '1em'

        },
        successStyles: {
            fontSize: '2em',
            color: 'green',
            margin: 'auto'
        },
        failureStyles : {
            fontSize: '2em',
            color: 'red',
            margin: 'auto'            
        }
        
    };


    return (
        <div className='notification-wrapper' style={styles.wrapperStyles}>
            <div className='notification-body' style={status === "success" ? styles.successStyles : styles.failureStyles}>{message}</div></div>
    )
}

export default Notification