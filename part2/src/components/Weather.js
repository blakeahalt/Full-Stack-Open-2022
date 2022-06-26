import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const access_key = process.env.REACT_APP_API_KEY
    
    const [ weather, setWeather] = useState({})
    console.log(weather)

    useEffect(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=imperial&appid=${access_key}`
          )
          .then((response) => {
            setWeather(response.data);
          });
      }, []);
    
      
      return (
        <>
          {weather.main ? (
            <div>
              <h2>Weather in {country.capital}</h2>
              <div>Temperature {weather.main.temp}°F</div>
              <img
                alt="weather icon"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
              {Object.keys(weather.weather).map((entries) => <div key={weather.weather[entries]}> Currently: {(weather.weather[entries].description)}</div>)}
              <div>Wind {weather.wind.speed} m/s</div>
            </div>
          ) : null}
        </>
      );
    };

export default Weather