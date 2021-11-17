import React, {useState} from 'react';
import './App.css';
import AddForm from './components/AddForm';
import Entries from './components/Entries';
import SearchArea from './components/SearchArea';

function App() {
  
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 }, { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 }, { name: 'Dan Abramov', number: '12-43-234345', id: 3 }, { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFound, setSearchFound] = useState('')
 


  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneInput = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchInput = (event) => {
    let upperSearch = event.target.value.toUpperCase();
    let found = persons.filter((person) => (person.name.toUpperCase().indexOf(upperSearch) !== -1 ));
    setSearchFound(found);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = {
      name: newName,
      number: newNumber
    };
    if(persons.some((person) => person.name === newName)){
      alert(`${newName} already added`)
    }else{ setPersons(persons.concat(newPerson))};
    setNewName('')
    setNewNumber('')
    setSearchFound(searchFound);
  }
  
  return (
    <div className="App">
      <h2>Phonebook</h2>
      <SearchArea handleSearchInput={handleSearchInput} />
      <h2>Add new</h2>
      <AddForm 
      handleSubmit={handleSubmit}
      handleNameInput={handleNameInput}
      handlePhoneInput={handlePhoneInput}
      newName={newName}
      newNumber={newNumber}
      />    
      <h2>Entries</h2>
        <Entries entries={persons} found={searchFound} />
    </div>
  );
}

export default App;
