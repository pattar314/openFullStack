import React, {useState} from 'react';
import './App.css';

function App() {
  
  const [persons, setPersons] = useState([{name: 'Arto Hellas', phone: 6639}])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = {
      name: newName,
      phone: newPhone
    };
    (persons.some((person) => person.name === newName) ? alert(`${newName} already added`) : setPersons(persons.concat(newPerson)));

    console.log(persons);
    setNewName('')
  }
  
  
  
  return (
    <div className="App">
      <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>name: <input onChange={handleNameInput} value={newName} type='text' /></div>
            <div>number: <input onChange={handlePhoneInput} value={newPhone} type='text' /></div>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
          <div>debug: {newName}</div>
        </form>    
        <h2>Numbers</h2>
        {persons.map(person => <div key={person.name}>{person.name}: {person.phone}</div> )}

    </div>
  );
}

export default App;
