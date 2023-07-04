import {  useApolloClient, useQuery, useSubscription  } from '@apollo/client'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import { useEffect, useState } from 'react'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'


export const updateCache = ( cache, query, addedPerson ) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson))
    }
  })
}


const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('phonebook-user-token'))
  const [allPersons, setAllPersons] = useState([])
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(addedPerson)
        }
      })
    }
  })


  useEffect(() => {
    if(!result.loading && result.data){
      setAllPersons(result.data.allPersons)
      console.log('all persons: ', allPersons)
    }
  }, [result, allPersons])
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('phonebook-user-token')
    client.resetStore()
  }



  if (!token){
    return(
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }


  return (
    <div className="App">
      <Notify errorMesssage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={allPersons} />
      <PersonForm setError={notify}/>
      <PhoneForm />
    </div>
  );
}

const Notify = ({ errorMessage}) => {
  if(!errorMessage){
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App;

