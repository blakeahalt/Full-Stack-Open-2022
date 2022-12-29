import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCountries from './ShowCountries.js'
import Weather from './Weather.js'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")
  // const [ weather, setWeather] = useState({})
  // const apiKey = '7103d3e9355c15bc232acd9442b53344'
  // console.log('countries', countries)

  const filteredCountry = countries.filter((country) => {  
    if (newFilter.toLowerCase() === 'georgia') {
      return country.name.common.toLowerCase() === 'georgia';
    }
    else if (newFilter.toLowerCase() === 'samoa') {
      return country.name.common.toLowerCase() === 'samoa';
    }
    else if (newFilter.toLowerCase() === 'sudan') {
      return country.name.common.toLowerCase() === 'sudan';
    }
    else {
      return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
    }
  });
    // console.log('filteredCountry', filteredCountry)

  // const filteredCountry = countries.filter((country) => {
  //   const lowerCaseName = country.name.common.toLowerCase();
  //   return lowerCaseName !== 'georgia' && lowerCaseName !== 'south georgia';
  // });

    useEffect(() => {
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
    } ,[])

  // console.log('filteredCountry', filteredCountry)
  // console.log('filteredCountry[0]', filteredCountry[0])
  
  return (
    <>
      <h2 style={{textAlign: 'center'}}>Country Lookup</h2>
        <div>
          Filter countries: <input value={newFilter} onChange={event => setNewFilter(event.target.value)} />
       </div>
        <div style={{ textAlign: 'center' }}>
    				<div style={{display: 'inline-block', textAlign: 'left'}}>
            <ShowCountries filteredCountry={filteredCountry} newFilter={newFilter} setNewFilter={setNewFilter} />
            </div>
        </div>
            <Weather filteredCountry={filteredCountry}/>
      </>
    )
}

  
export default App
