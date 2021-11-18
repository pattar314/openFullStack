
import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState('')

  const handleSearchChange = (event) => {
    setSearchResults('')
    let data;
    setSearch(event.target.value)
    let searchUrl = `https://restcountries.com/v3.1/name/${event.target.value}`;
    if (search !== ''){
      try{
        axios.get(searchUrl).then((response) => {
          data = response.data;
          (data.length === 1 ? displaySingleCountry(data[0]) : (data.length < 10 && search !== '' ? displayMultipleCountries(data) : console.log('Please enter more of the country name')))})
          .catch(error => console.log('there was an error: ', error.message))
      
      }catch(error){console.log('there was an error: ', error.message)}
    }}
  
  const displaySingleCountry = (country) => {
      let languages = []
      for(let lang in country.languages){
            languages.push(<li key={lang}>{country.languages[lang]}</li>)}
      setSearchResults(<div>
        <h2>{country.name.common}</h2>
          <br />
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <br />
          <h3>Languages</h3>
          <ul>{languages}</ul>
          <div style={{fontSize: '3em'}}  >{country.flag}</div>
      </div>
      )
  }
 
  const displayMultipleCountries = (data) => {
    setSearchResults(data.map((country) => <div key={country.name.common}>{country.name.common}: {country.capital} <button onClick={() => displaySingleCountry(country)}>Show</button></div>))
  }

  return (
    <div className="App">
      <div>Find countries:  <input onChange={handleSearchChange} type="text" value={search} /> </div>
      <div>{searchResults}</div>
    </div>
  );
}

export default App;
