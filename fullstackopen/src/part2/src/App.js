import { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCountries from './ShowCountries.js'
// require('dotenv').config({ path: './.env' })
// require('dotenv').config()
// const express = require('express')
// const http = require('http');
// import http from 'http'
import express from 'express'
const app = express()
app.use(express.static('build'))
app.use(express.json())
const cors = require('cors')
app.use(cors())

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  } ,[])

  console.log('render', countries.length, 'countries')

  const filteredCountry = countries.filter((country) =>
  country.name.official.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <>
      <h2>Country Lookup</h2>
        <div>
          Filter countries: <input value={newFilter} onChange={event => setNewFilter(event.target.value)} />
       </div>
          <ShowCountries filteredCountry={filteredCountry} setNewFilter={setNewFilter} />
      </>
    )
  }

  const Weather = ( country ) => {
  
    const [ weather, setWeather] = useState({})
    const apiKey = '7103d3e9355c15bc232acd9442b53344'
    console.log(country)
  
    useEffect(() => {
      async function fetchData() {
        try {
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${country.country.capital}&units=imperial&&appid=${apiKey}`;
          const response = await axios.get(apiUrl);
          setWeather(response.data);
        } catch (error) {
          // Handle the error here
        }
      }
      fetchData();
    }, []);
    
      console.log('weatherData', weather)
        
        return (
          <>
            {/* {weather ? ( */}
              <div>
                <h2>Weather in {country.country.capital ? country.country.capital[0] : country.country.capital}</h2>
                <div>Current forecast: {weather.list ? weather.list[0].weather[0].description : null}</div>
                <div>Temperature: {weather.list ? weather.list[0].main.temp : null}°F</div>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[0].weather[0].icon : null}@2x.png`}
                  />
                <div>Tomorrow's forecast: {weather.list ? weather.list[8].weather[0].description : null}</div>
                <div>Temperature: {weather.list ? weather.list[8].main.temp : null}°F</div>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[8].weather[0].icon : null}@2x.png`}
                  />
                <div>Day after tomorrow's forecast: {weather.list ? weather.list[16].weather[0].description : null}</div>
                <div>Temperature: {weather.list ? weather.list[16].main.temp : null}°F</div>
                <img
                  alt="weather icon"
                  src={`http://openweathermap.org/img/wn/${weather.list ? weather.list[16].weather[0].icon : null}@2x.png`}
                  />
                {/* {Object.keys(weather.weather).map((entries) => <div key={weather.weather[entries]}> Currently: {(weather.weather[entries].description)}</div>)} */}
                {/* <div>Wind {weather.wind.speed} m/s</div> */}
              </div>
            {/* ) : null} */}
          </>
        );
      };
  
// const PORT = "8080";
app.listen(3000, () => {
  console.log('Server running on port 8080')
})

export default App
