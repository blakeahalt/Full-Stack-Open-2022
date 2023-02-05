import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCountries from './ShowCountries.js'
import Weather from './Weather.js'
import './country.css'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")

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
    else if (newFilter.toLowerCase() === 'guinea') {
      return country.name.common.toLowerCase() === 'guinea';
    }
    else if (newFilter.toLowerCase() === 'united states') {
      return country.name.common.toLowerCase() === 'united states';
    }
    else {
      return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
    }
  }).map((country, index) => {
    return {...country, key: index}
  });

    useEffect(() => {
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
    } ,[])
  
  return (
    <div >
      <div className='img'/>
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
        </div>
    // </div>
    )
}

  
export default App
