import React from 'react'

const Entries = ({entries, found}) => {
   
    let book = (found ? found.map(person => <div key={person.name}>{person.name}: {person.number}</div>) : entries.map(person => <div key={person.name}>{person.name}: {person.number}</div>))
    return (
        <div>
            {book}
        </div>
    )
}

export default Entries
