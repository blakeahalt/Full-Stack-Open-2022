import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCountries from './ShowCountries.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  } ,[])

  // console.log('render', countries.length, 'countries')

  const filteredCountry = countries.filter((country) =>
  country.name.official.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <>
      <h2>Country Lookup</h2>
        <div>
          Filter countries: <input value={newFilter} onChange={event => setNewFilter(event.target.value)} />
       </div>
        <div style={{ textAlign: 'center' }}>
    				<div style={{display: 'inline-block', textAlign: 'left'}}>
          <ShowCountries filteredCountry={filteredCountry} setNewFilter={setNewFilter} />
          </div>
          </div>
      </>
    )
  }
  
export default App
