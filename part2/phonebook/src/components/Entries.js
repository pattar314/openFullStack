import React from 'react'

const Entries = ({book, deleteEntry}) => {
   
    console.log('book: ', book)
    return (
        <div>
            {book.map(entry => <div key={entry.id}>{entry.name}: {entry.number} <button onClick={() => (window.confirm('Are you sure you would like to delete this entry?') ? deleteEntry(entry.id) : null)} >Delete</button> </div>)}
        </div>
    )
}

export default Entries
