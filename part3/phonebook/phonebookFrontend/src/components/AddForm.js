import React from 'react'

const AddForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
          <div>name:  <input onChange={props.handleNameInput} value={props.newName} type='text' /></div>
          <div>number: <input onChange={props.handlePhoneInput} value={props.newNumber} type='text' /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>    
    )
}

export default AddForm
