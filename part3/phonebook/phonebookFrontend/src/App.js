import React, {useState, useEffect} from 'react';
import './App.css';
import AddForm from './components/AddForm';
import Entries from './components/Entries';
import Notification from './components/Notification';
import SearchArea from './components/SearchArea';
import phonebookServices from './services/phonebook.services.js';

function App() {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [book, setBook] = useState(false)
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

useEffect(() => {
  phonebookServices.readAll()
  .then(initalPersons => {
    setPersons(initalPersons);
    console.log(initalPersons)
  })
}, [])


  const handleNameInput = (event) => {
    console.log(newName)
    setNewName(event.target.value);
  }

  const handlePhoneInput = (event) => {
    console.log(newNumber)
    setNewNumber(event.target.value);
  }

  const handleSearchInput = (event) => {
    let upperSearch = event.target.value.toUpperCase();
    let found = persons.filter((person) => (person.name.toUpperCase().indexOf(upperSearch) !== -1 ));
    (upperSearch === '' ? setBook(false) : setBook(found))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName,
      number: newNumber
    };

    let found = persons.find((person) => person.name === newName)
  
    if(found){
      (window.confirm(`The entry for ${newName} already exists would you like to update the number?`)
      ? phonebookServices.updateEntry(found.id, newPerson).then(updatedPerson => {
        let clone = persons.map(person => person.name === newName ? {...person, number: newNumber} : person)
        console.log('updated clone: ', clone)
        setPersons(clone)
        handleMessage('Entry updated', "success")
      }).catch((err) => {
        console.log("There was an error: ", err.message)
        setMessage("This entry is no longer on the server", "failure")
      })
      : window.alert('Number not updated') );
    } else {
      phonebookServices.createEntry(newPerson)
      .then(updatedPerson => {
        setPersons(persons.concat(updatedPerson))
        console.log('updated persons', persons)
        handleMessage('Entry created', "success")
      })
      .catch(error => console.log(error))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleMessage = (messageBody, status) => {
    setMessage(messageBody);
    setStatus(status)
    setTimeout(()=> {
      setMessage(null);
      setStatus(null)
    }, 2000)
  }

  const deleteEntry = (id) => {
    phonebookServices.deleteEntry(id);
    setMessage('Entry deleted', 'failure')
    setPersons(persons.filter(person => person.id !== id))
    }
  
  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={message} status={status} />
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
        <Entries book={ book ? book : persons } deleteEntry={deleteEntry} />
    </div>
  );
}

export default App;
