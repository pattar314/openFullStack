import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import AddForm from './components/AddForm';
import Entries from './components/Entries';
import SearchArea from './components/SearchArea';

function App() {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFound, setSearchFound] = useState('')

useEffect(() => {
  axios.get('http://localhost:3001/persons').then(response => setPersons(response.data))
}, [])


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
