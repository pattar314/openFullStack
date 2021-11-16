import React, {useState} from 'react';
import './App.css';

function App() {
  
  const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
  const [newName, setNewName] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    (persons.some((person) => person.name === newName) ? alert(`${newName} already added`) : setPersons(persons.concat({name: newName})));
    console.log(persons)
    setNewName('')
  }
  
  
  
  return (
    <div className="App">
      <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleNameInput} value={newName} type='text' />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
          <div>debug: {newName}</div>
        </form>    
        <h2>Numbers</h2>
        {persons.map(person => <div key={person.name}>{person.name}</div> )}

    </div>
  );
}

export default App;
