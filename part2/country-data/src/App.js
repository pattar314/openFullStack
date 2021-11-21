
import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [weather, setWeather] = useState('')

  let api_key = process.env.REACT_APP_WEATHER_API_KEY
   const fetchWeather = async (country) => {
      const params = {access_key: api_key, query: `${country.capital}`, units: 'f'}
      try{
      let data = await axios.get(`http://api.weatherstack.com/current`, {params}).then(response => response.data.current)
        console.log('weather data: ', data)
      return data
      } catch (err){ console.log('there was an outer error: ', err) }
      
   }
 

  const handleSearchChange = (event) => {
    setSearchResults('')
    setSearch(event.target.value)
    let searchUrl = `https://restcountries.com/v3.1/name/${event.target.value}`;
    if (search !== ''){
      try{
        let data = axios.get(searchUrl)
        .then((response) => {
          data = response.data;
          (data.length === 1 ? displaySingleCountry(data[0]) : (data.length < 10 && search !== '' ? displayMultipleCountries(data) : console.log('Please enter more of the country name')))})
          .catch(error => console.log('there was an error: ', error.message))
      
      }catch(error){console.log('there was an error: ', error.message)}
    }}
  
  const displaySingleCountry = async (country) => {
      let data = await fetchWeather(country)
      setWeather(<>
          <img src={data.weather_icons} alt='weather' />
          <div>the temperature in {country.capital} is {data.temperature} and the wind is {data.wind_speed} {data.wind_dir} </div>
        </>);
      let languages = []
      for(let lang in country.languages){
            languages.push(<li key={lang}>{country.languages[lang]}</li>)}
      setSearchResults(
      <div>
        <h2>{country.name.common}</h2>
          <br />
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <br />
          <h3>Languages</h3>
          <ul>{languages}</ul>
          <div style={{fontSize: '3em'}}  >{country.flag}</div>
          <h3>Weather in {country.capital}</h3>
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
      <div>{weather}</div>
    </div>
  );
}

export default App;
